import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled || isMenuOpen ? 'bg-white bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">
            <a href="#" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
              <img src="/images/new-logo.png.png" alt="IPage Vision Logo" className="h-8 w-auto" />
            </a>
          </div>
          <button 
            className="group flex flex-col justify-center items-center h-8 w-8 focus:outline-none z-50" 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`w-8 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-black transition-opacity duration-300 ease-in-out my-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-8 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
          </button>
        </div>
      </header>
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;