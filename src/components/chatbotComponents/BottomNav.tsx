import React from 'react';
import { Tab } from './types';
interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  conversationCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, conversationCount }) => {
  const navItems = [
    { tab: Tab.Home, iconClass: 'fa-solid fa-house', label: 'Home' },
    { tab: Tab.Messages, iconClass: 'fa-solid fa-message', label: 'Messages' },
    { tab: Tab.Help, iconClass: 'fa-solid fa-circle-question', label: 'Help' },
  ];

  return (
    <nav className="w-full bg-white border-t border-gray-200 flex justify-around p-2 rounded-b-2xl flex-shrink-0">
      {navItems.map(({ tab, iconClass, label }) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex flex-col items-center justify-center w-1/3 py-2 px-1 rounded-lg transition-all duration-200 ${
            activeTab === tab
              ? 'text-brand-orange'
              : 'text-gray-500 hover:bg-orange-50'
          }`}
        >
          <div className="relative">
            <i className={`${iconClass} text-2xl mb-1`}></i>
            {/* UPDATED: Badge is now larger and more prominent to match the FAB badge style. */}
            {tab === Tab.Messages && conversationCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {conversationCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
