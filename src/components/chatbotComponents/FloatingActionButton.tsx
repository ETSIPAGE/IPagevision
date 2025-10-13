import React from 'react';

interface FloatingActionButtonProps {
  isOpen: boolean;
  onClick: () => void;
  conversationCount: number;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ isOpen, onClick, conversationCount }) => {
  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 opacity-100 pointer-events-auto`}>
      <button
        onClick={onClick}
        className="w-14 h-14 bg-brand-orange rounded-full shadow-lg flex items-center justify-center text-white transform hover:scale-105 transition-all duration-300 relative"
        aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
      >
        {/* Badge */}
        {!isOpen && conversationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md">
            {conversationCount}
          </span>
        )}

        {/* Logo and Close Icon */}
        <div className="relative w-9 h-9">
          <img
            src="src/components/chatbotComponents/logochatbot.svg"
            alt="Open Chat Widget"
            className={`w-full h-full absolute top-0 left-0 rounded-lg transition-all duration-300 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
          />
          <CloseIcon
            className={`w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          />
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;