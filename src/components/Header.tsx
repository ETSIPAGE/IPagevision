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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-white transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 py-2 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/ipagevisionlogo.png"
              alt="IPage Vision Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        <nav className="mt-4 md:mt-0 flex flex-wrap gap-4 md:gap-8 text-lg font-semibold text-black">
          <a href="#about-us" className="hover:text-orange-400 transition-colors">About us</a>
          <a href="#works" className="hover:text-orange-400 transition-colors">Projects</a>
          <a href="#services" className="hover:text-orange-400 transition-colors">Services</a>
          <a href="#workflow" className="hover:text-orange-400 transition-colors">Workflow</a>
          <a href="#clients" className="hover:text-orange-400 transition-colors">Clients</a>
          <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
