import React from 'react';
import { NAV_LINKS } from '../constants';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Menu */}
      <nav
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-black z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 md:px-12 py-24 h-full overflow-y-auto">
          <div className="grid grid-cols-2 gap-8">
            {NAV_LINKS.map((category, catIndex) => (
              <div key={category.title}>
                <h3 className="text-gray-400 font-semibold mb-4 transition-all duration-500 ease-out" style={{ transitionDelay: `${100 + catIndex * 100}ms`, opacity: isOpen ? 1 : 0 }}>
                  {category.title}
                </h3>
                <ul>
                  {category.links.map((link, linkIndex) => (
                    <li key={link.name} className="mb-2">
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="text-white text-xl hover:text-gray-300 transition-all duration-500 ease-out"
                        style={{
                          transitionDelay: `${200 + catIndex * 100 + linkIndex * 50}ms`,
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                          display: 'inline-block'
                        }}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;