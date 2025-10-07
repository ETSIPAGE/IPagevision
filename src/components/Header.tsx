import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/images/ipagevision.png" alt="IPage Vision Logo" className="h-10 w-auto" />
            </Link>
          </div>
          <nav className={`mt-4 md:mt-0 flex flex-wrap gap-4 md:gap-8 text-lg font-semibold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
            <a href="#about-us" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>About us</a>
            <a href="#works" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Projects</a>
            <a href="#services" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Services</a>
            <a href="#workflow" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Workflow</a>
            <a href="#clients" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Clients</a>
            <a href="#contact" className={`hover:text-orange-400 transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;