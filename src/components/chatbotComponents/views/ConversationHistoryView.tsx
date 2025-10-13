import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '../types';
interface ConversationHistoryViewProps {
    conversations: Conversation[];
    onSelectConversation: (id: string) => void;
    onStartNewChat: () => void;
    onClose: () => void;
}

const ConversationHistoryView: React.FC<ConversationHistoryViewProps> = ({ conversations, onSelectConversation, onStartNewChat, onClose }) => {
    return (
        <div className="h-full flex flex-col bg-gray-50">
            <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-white">
                <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close chat">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <button
                    onClick={onStartNewChat}
                    className="w-full mb-4 p-4 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-orange-dark transition-colors shadow-sm"
                >
                    Start a New Conversation
                </button>
                {conversations.length === 0 ? (
                    <div className="text-center text-gray-500 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="mt-2 font-semibold">No conversations yet.</p>
                        <p className="text-sm">Click the button above to start chatting!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {conversations.map((convo) => {
                            const messages = convo.messages || [];
                            const lastMessage = messages[messages.length - 1];
                            const previewText = lastMessage ? (lastMessage.isUser ? `You: ${lastMessage.text}` : `IPage Vision Assistant: ${lastMessage.text}`) : 'New Conversation';
                            
                            const lastUpdatedDate = new Date(convo.lastUpdated);
                            const isPlaceholderDate = lastUpdatedDate.getTime() < 1000;

                            return (
                                <div
                                    key={convo.id}
                                    onClick={() => !convo.error && onSelectConversation(convo.id)}
                                    className={`flex items-center p-4 bg-white rounded-lg shadow-sm border transition-all duration-200 ${
                                        convo.error
                                            ? 'border-red-300 bg-red-50 cursor-not-allowed'
                                            : 'border-gray-200 hover:border-brand-orange cursor-pointer'
                                    }`}
                                >
                                    {convo.error && (
                                        <div className="mr-3 flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="flex-grow pr-2 overflow-hidden">
                                        <p className={`font-semibold truncate ${convo.error ? 'text-red-700' : 'text-gray-800'}`}>
                                            {convo.title || previewText}
                                        </p>
                                        
                                        {convo.error ? (
                                             <p className="text-sm text-red-600 mt-1">{convo.error}</p>
                                        ) : !isPlaceholderDate && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatDistanceToNow(lastUpdatedDate, { addSuffix: true })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};
export default ConversationHistoryView;