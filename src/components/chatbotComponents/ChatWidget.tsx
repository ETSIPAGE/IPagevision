
import React, { useState, useEffect, useRef } from 'react';
import { Tab, Conversation, Message } from './types';
import BottomNav from './BottomNav';
import ConversationHistoryView from './views/ConversationHistoryView';
import MessagesView from './views/MessagesView';
import HomeView from './views/HomeView';
import HelpView from './views/HelpView';
import { MoreIcon } from './icons/ActionIcons';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// WARNING: Hardcoding API keys in client-side code is a major security risk.
// This key can be easily stolen and abused. Use a backend proxy for production environments.
const OPENAI_API_KEY =  import.meta.env.VITE_OPENAI_KEY;

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, conversations, setConversations }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStartNewChat = () => {
    const newConversation: Conversation = {
      id: `convo-${Date.now()}`,
      sessionId: uuidv4(),
      messages: [
        {
          id: 'welcome-1',
          text: "Hi there! You're speaking with IPage Vision Assistant.",
          isUser: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: 'welcome-2',
          text: 'How can I help?',
          isUser: false,
          timestamp: new Date().toISOString(),
        }
      ],
      lastUpdated: new Date().toISOString(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setActiveTab(Tab.Messages);
  };
  
  const generateConversationTitle = async (conversation: Conversation) => {
    try {
        const conversationText = conversation.messages
            .map(m => `${m.isUser ? 'User' : 'Assistant'}: ${m.text}`)
            .join('\n');

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Summarize the following conversation into a short, concise title (max 5 words). Do not use quotes or any introductory text like "Title:". Just provide the title.'
                    },
                    {
                        role: 'user',
                        content: conversationText
                    }
                ],
                max_tokens: 15,
                temperature: 0.3,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || 'OpenAI API request failed');
        }

        const data = await response.json();
        const newTitle = data.choices[0]?.message?.content?.trim().replace(/^"|"$/g, '');

        if (newTitle) {
            setConversations(prev =>
                prev.map(c => (c.id === conversation.id ? { ...c, title: newTitle } : c))
            );
        }
    } catch (error) {
        console.error('Failed to generate conversation title with OpenAI:', error);
    }
  };

  const handleSelectConversation = (id: string) => {
    // Data is now pre-loaded by App.tsx, so we just need to set the active conversation.
    setActiveConversationId(id);
    setActiveTab(Tab.Messages);
  };
  
  const handleSendMessage = async (text: string) => {
    if (!activeConversationId || isGenerating || !text.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    // Add user's message and set generating state to show the typing indicator.
    const updatedConversations = conversations.map(c =>
      c.id === activeConversationId
        ? { ...c, messages: [...c.messages, userMessage], lastUpdated: new Date().toISOString() }
        : c
    );
    setConversations(updatedConversations);
    setIsGenerating(true);
    
    try {
      const activeConvo = updatedConversations.find(c => c.id === activeConversationId);
      
      const API_ENDPOINT =  import.meta.env.VITE_FLOWISE_PREDICTION_ENDPOINT;

      const requestBody: {
        question: string;
        overrideConfig?: { sessionId: string; };
      } = {
        question: text,
      };

      if (activeConvo?.sessionId) {
        requestBody.overrideConfig = {
          sessionId: activeConvo.sessionId
        };
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorBody.message || 'API request failed');
      }

      const data = await response.json();
      let botResponseText = '';
      if (data && typeof data.text === 'string') {
        botResponseText = data.text;
      } else if (typeof data === 'string') {
        botResponseText = data;
      } else {
        console.warn('Unexpected API response format. Stringifying for display.', data);
        botResponseText = JSON.stringify(data, null, 2);
      }
      
      // Remove markdown bolding from the response
      botResponseText = botResponseText.replace(/\*\*/g, '');

      if (!botResponseText.trim()) {
        botResponseText = "I'm sorry, I couldn't generate a response.";
      }

      const botMessageId = `msg-${Date.now() + 1}`;
      let currentIndex = 0;
      const typingSpeed = 25; // ms per character

      const typeCharacter = () => {
        // Stop if the response is fully typed.
        if (currentIndex >= botResponseText.length) {
            setIsGenerating(false);
            setConversations(prev => {
              const finalConversations = prev.map(c => 
                  c.id === activeConversationId 
                  ? { ...c, lastUpdated: new Date().toISOString() } 
                  : c
              );
              
              // After message is sent, check if we should generate a title
              const updatedConvo = finalConversations.find(c => c.id === activeConversationId);
              if (updatedConvo && (!updatedConvo.title || updatedConvo.title === 'Chat History') && updatedConvo.messages.filter(m => m.isUser).length === 1) {
                  generateConversationTitle(updatedConvo);
              }

              return finalConversations;
            });
            return;
        }

        const currentText = botResponseText.substring(0, currentIndex + 1);

        if (currentIndex === 0) {
            // On the first character, add the new message object to the conversation.
            const botMessage: Message = {
                id: botMessageId,
                text: currentText,
                isUser: false,
                timestamp: new Date().toISOString(),
            };
            setConversations(prev => prev.map(c => 
                c.id === activeConversationId 
                    ? { ...c, messages: [...c.messages, botMessage] } 
                    : c
            ));
        } else {
            // For subsequent characters, update the text of the last message.
            setConversations(prev => prev.map(c => {
                if (c.id === activeConversationId) {
                    const newMessages = [...c.messages];
                    const lastMessageIndex = newMessages.length - 1;
                    if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].id === botMessageId) {
                       newMessages[lastMessageIndex] = { ...newMessages[lastMessageIndex], text: currentText };
                    }
                    return { ...c, messages: newMessages };
                }
                return c;
            }));
        }

        currentIndex++;
        setTimeout(typeCharacter, typingSpeed);
      };
      
      // Start the animation.
      setTimeout(typeCharacter, typingSpeed);

    } catch (error) {
        console.error('Error fetching from API:', error);
        const errorMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          text: error instanceof Error ? error.message : 'Sorry, I had trouble connecting. Please try again.',
          isUser: false,
          timestamp: new Date().toISOString(),
        };
       setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, messages: [...c.messages, errorMessage] } : c));
       setIsGenerating(false);
    }
  };


  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const isInConversation = activeTab === Tab.Messages && activeConversation;

  const renderContent = () => {
    if (isInConversation) {
      return <MessagesView conversation={activeConversation} onSendMessage={handleSendMessage} isGenerating={isGenerating} />;
    }
    
    switch (activeTab) {
      case Tab.Home:
        return <HomeView setActiveTab={setActiveTab} conversations={conversations} onClose={onClose} />;
      case Tab.Messages:
        return <ConversationHistoryView conversations={conversations} onSelectConversation={handleSelectConversation} onStartNewChat={handleStartNewChat} onClose={onClose} />;
      case Tab.Help:
        return <HelpView onClose={onClose} />;
      default:
        return <HomeView setActiveTab={setActiveTab} conversations={conversations} onClose={onClose} />;
    }
  };

  return (
    <div
      className={`fixed bg-white flex flex-col overflow-hidden transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } inset-0 rounded-none sm:rounded-2xl sm:inset-auto sm:right-4 sm:shadow-lg ${
        isExpanded 
        ? 'sm:bottom-4 sm:w-[800px] sm:h-[90vh]' 
        : 'sm:bottom-20 sm:w-[400px] sm:h-[700px] sm:max-h-[calc(100vh-6.5rem)]'
      }`}
    >
      {isInConversation ? (
        <header className="bg-white p-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center overflow-hidden">
            <button onClick={() => setActiveConversationId(null)} className="mr-2 p-1 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <img src="\src\components\chatbotComponents\logochatbot.svg" alt="IPage Vision Logo" className="w-8 h-8 rounded-md mr-3 flex-shrink-0" />
            <div className="overflow-hidden">
              <h2 className="font-bold text-base text-gray-800 truncate">{activeConversation?.title || 'IPage Vision Assistant'}</h2>
              <p className="text-xs text-gray-500">The team can also help</p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-gray-100 hidden sm:block">
              <MoreIcon className="w-5 h-5 text-gray-600" />
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                <button 
                  onClick={() => {
                    setIsExpanded(prev => !prev);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {isExpanded ? 'Shrink Window' : 'Expand Window'}
                </button>
              </div>
            )}
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>
      ) : null}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>

      {!isInConversation && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} conversationCount={conversations.length} />}
    </div>
  );
};
export default ChatWidget;