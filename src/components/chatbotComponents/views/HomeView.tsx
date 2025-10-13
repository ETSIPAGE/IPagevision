import React from 'react';
import { Conversation, Tab } from '../types';
import { formatDistanceToNow } from 'date-fns';
interface HomeViewProps {
  setActiveTab: (tab: Tab) => void;
  conversations: Conversation[];
  onClose: () => void;
}

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, conversations, onClose }) => {
  const recentConversation = conversations && conversations.length > 0 ? conversations[0] : null;
  const lastMessage = recentConversation?.messages[recentConversation.messages.length - 1];
  
  const previewText = lastMessage 
    ? (lastMessage.isUser ? `You: ${lastMessage.text}` : lastMessage.text) 
    : "No recent messages";

  return (
    // Main container with a lighter orange gradient
    <div className="relative h-full w-full flex flex-col bg-gradient-to-b from-orange-400 to-gray-50">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white bg-black bg-opacity-20 hover:bg-opacity-40 transition-colors"
        aria-label="Close chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Header section with updated text colors */}
      <div className="p-6 pt-12 flex-shrink-0">
        <h1 className="text-3xl font-bold text-brand-orange-dark">IPage Vision Help Desk</h1>
        <p className="text-lg text-black mt-2">— Find answers in docs or start a quick chat</p>
      </div>

      {/* Scrollable content section, now transparent to show the gradient */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Recent Message Card - Now conditional and dynamic */}
        {recentConversation && lastMessage && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 mb-2">Recent message</p>
                <button onClick={() => setActiveTab(Tab.Messages)} className="w-full flex items-center justify-between text-left group">
                    <div className="flex items-center overflow-hidden">
                        <i className="fa-solid fa-circle-question text-3xl w-8 text-center mr-3 text-brand-orange flex-shrink-0"></i>
                        <div className="overflow-hidden">
                            <p className="font-semibold text-gray-800 truncate">{previewText}</p>
                            <p className="text-sm text-gray-500">
                                Chat • {formatDistanceToNow(new Date(recentConversation.lastUpdated), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
            </div>
        )}

        {/* Ask a question Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <button onClick={() => setActiveTab(Tab.Messages)} className="w-full flex items-center justify-between text-left group">
                <div>
                    <p className="font-semibold text-gray-800">Ask a question</p>
                    <p className="text-sm text-gray-500">AI Agent and team can help</p>
                </div>
                <div className="flex items-center">
                     <i className="fa-solid fa-circle-question text-3xl w-8 text-center text-brand-orange"></i>
                     <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform ml-2" />
                </div>
            </button>
        </div>

        {/* Help & FAQs Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <button onClick={() => setActiveTab(Tab.Help)} className="w-full flex items-center justify-between text-left group">
                <div>
                    <p className="font-semibold text-gray-800">Help & FAQs</p>
                    <p className="text-sm text-gray-500">Find answers to common questions</p>
                </div>
                <div className="flex items-center">
                     <i className="fa-solid fa-book-open text-3xl w-8 text-center text-brand-orange"></i>
                     <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform ml-2" />
                </div>
            </button>
        </div>
      </div>
       <div className="p-4 text-center flex-shrink-0">
          <a
            href="https://ipageums.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-brand-orange-dark hover:underline transition-colors"
          >
            Powered By IPage UMS
          </a>
        </div>
    </div>
  );
};

export default HomeView;