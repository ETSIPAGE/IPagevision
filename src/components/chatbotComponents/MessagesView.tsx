
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Conversation, Message } from './types';
import { SendUpArrowIcon } from './icons/ActionIcons';
import { format } from 'date-fns';
import EmojiPicker from 'emoji-picker-react';

interface MessagesViewProps {
    conversation: Conversation;
    onSendMessage: (text: string) => void;
    isGenerating: boolean;
}

const ASSEMBLYAI_API_KEY = import.meta.env.VITE_ASSEMBLYAI_TOKEN;

const MessagesView: React.FC<MessagesViewProps> = ({ conversation, onSendMessage, isGenerating }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [micError, setMicError] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [visibleTimestampId, setVisibleTimestampId] = useState<string | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setInput((prev) => prev + emojiObject.emoji);
        textareaRef.current?.focus();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleToggleTimestamp = (messageId: string) => {
        setVisibleTimestampId(prevId => (prevId === messageId ? null : messageId));
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const timer = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timer);
    }, [conversation.messages, isGenerating]);

    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [input]);


    const handleSend = () => {
        if (!input.trim() || isTranscribing || isGenerating) return;
        onSendMessage(input);
        setInput('');
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Placeholder for file handling logic
            console.log('Selected file:', file.name);
            // Reset file input to allow selecting the same file again
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleToggleRecording = async () => {
        setMicError('');
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;
                const audioChunks: Blob[] = [];

                recorder.ondataavailable = (event) => audioChunks.push(event.data);

                recorder.onstop = async () => {
                    setIsTranscribing(true);
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

                    try {
                        // Step 1: Upload audio file to AssemblyAI
                        const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
                            method: 'POST',
                            headers: {
                                'authorization': ASSEMBLYAI_API_KEY,
                                'content-type': audioBlob.type,
                            },
                            body: audioBlob,
                        });
                        const uploadData = await uploadResponse.json();
                        if (!uploadResponse.ok || !uploadData.upload_url) {
                            throw new Error(uploadData.error || 'Failed to upload audio file to AssemblyAI.');
                        }

                        // Step 2: Request transcription
                        const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
                            method: 'POST',
                            headers: {
                                'authorization': ASSEMBLYAI_API_KEY,
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify({ audio_url: uploadData.upload_url }),
                        });
                        const transcriptData = await transcriptResponse.json();
                        if (!transcriptResponse.ok || !transcriptData.id) {
                            throw new Error(transcriptData.error || 'Failed to start transcription job.');
                        }
                        const transcriptId = transcriptData.id;

                        // Step 3: Poll for transcription result
                        const pollForTranscript = async () => {
                            try {
                                const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
                                    headers: { 'authorization': ASSEMBLYAI_API_KEY },
                                });
                                const pollData = await pollResponse.json();

                                if (pollData.status === 'completed') {
                                    if (pollData.text) {
                                        setInput(prev => prev ? `${prev} ${pollData.text}` : pollData.text);
                                    } else {
                                        setMicError('Could not detect any speech in the audio.');
                                    }
                                    setIsTranscribing(false);
                                } else if (pollData.status === 'error') {
                                    throw new Error(`Transcription failed: ${pollData.error}`);
                                } else {
                                    setTimeout(pollForTranscript, 3000); // Poll again in 3 seconds
                                }
                            } catch (err) {
                                const message = err instanceof Error ? err.message : 'Error fetching transcription status.';
                                setMicError(message);
                                console.error(err);
                                setIsTranscribing(false);
                            }
                        };

                        setTimeout(pollForTranscript, 1000); // Start polling

                    } catch (err) {
                        const message = err instanceof Error ? err.message : 'Error transcribing audio. Please try again.';
                        setMicError(message);
                        console.error(err);
                        setIsTranscribing(false);
                    }
                    stream.getTracks().forEach(track => track.stop());
                };

                recorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Error accessing microphone:", err);
                setMicError('Microphone access was denied. Please enable it in your browser settings.');
            }
        }
    };


    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            return format(date, 'p');
        } catch {
            return "Just now"
        }
    };

    return (
        <div className="h-full w-full flex flex-col bg-gray-50">
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {(conversation.messages || []).map((msg) => (
                    <div key={msg.id} className={`flex flex-col items-${msg.isUser ? 'end' : 'start'}`}>
                        <div className={`flex items-end gap-2 max-w-[90%] ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            <button
                                type="button"
                                onClick={() => handleToggleTimestamp(msg.id)}
                                className={`max-w-full px-4 py-2 rounded-2xl text-left ${msg.isUser ? 'bg-orange-500 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg border border-gray-200'}`}
                                aria-label={`Message from ${msg.isUser ? 'You' : 'IPage Vision Assistant'}. Click to toggle timestamp.`}
                            >
                                <p className="text-base" dangerouslySetInnerHTML={{ __html: (msg.text || '').replace(/\n/g, '<br />') }}></p>
                            </button>
                        </div>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${visibleTimestampId === msg.id ? 'max-h-6 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
                            <div className={`text-xs text-gray-400 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                                <span>{msg.isUser ? 'You' : 'IPage Vision Assistant'} • {formatTimestamp(msg.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {isGenerating && conversation.messages[conversation.messages.length - 1]?.isUser && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-white text-gray-800 rounded-bl-lg border border-gray-200">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            <footer className="relative bg-white border-t border-gray-200 p-2 flex-shrink-0">
                {showEmojiPicker && (
                    <div ref={emojiPickerRef} className="absolute bottom-full right-2 mb-2 z-10">
                        <EmojiPicker onEmojiClick={onEmojiClick} height={350} />
                    </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="w-full">
                    <div className="flex items-end w-full border border-gray-300 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-orange transition-shadow duration-200">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={
                                isTranscribing
                                    ? "Transcribing..."
                                    : isGenerating
                                        ? "Wait for response..."
                                        : "Ask a question..."
                            }
                            className="flex-1 resize-none outline-none bg-transparent text-gray-800 text-base"
                            rows={1}
                            disabled={isTranscribing || isGenerating}
                            style={{
                                resize: "none",
                                height: "20px",
                                maxHeight: "50px",
                                overflowY: "auto",
                            }}
                        />
                        <div className="flex items-center gap-0.5 text-gray-500 flex-shrink-0 ml-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                                aria-hidden="true"
                                tabIndex={-1}
                            />
                            <button type="button" onClick={handleFileUploadClick} className="p-1.5 rounded-full hover:bg-gray-100 hover:text-gray-800" aria-label="Attach file">
                                <i className="fa-solid fa-file-arrow-up text-base"></i>
                            </button>
                            <button type="button" onClick={() => setShowEmojiPicker((val) => !val)} className="p-1.5 rounded-full hover:bg-gray-100 hover:text-gray-800" aria-label="Open emoji picker">
                                <i className="fa-regular fa-face-smile text-base"></i>
                            </button>
                            <button type="button" onClick={handleToggleRecording} className={`p-1.5 rounded-full hover:bg-gray-100 hover:text-gray-800 ${isRecording ? 'text-red-500' : ''}`} aria-label={isRecording ? 'Stop recording' : 'Start recording'}>
                                <i className="fa-solid fa-microphone text-base"></i>
                            </button>
                            <button
                                type="submit"
                                disabled={!input.trim() || isTranscribing || isGenerating}
                                className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full transition-colors ml-1 ${input.trim() && !isGenerating ? 'bg-brand-orange hover:bg-brand-orange-dark' : 'bg-gray-300'}`}
                                aria-label="Send message"
                            >
                                <SendUpArrowIcon className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </form>
                {micError && <p className="text-xs text-red-500 mt-1 ml-2">{micError}</p>}
            </footer>
        </div>
    );
};
export default MessagesView;
