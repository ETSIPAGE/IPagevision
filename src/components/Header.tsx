import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // hamburger & close icons

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/ipagevisionlogo.png"
            alt="IPage Vision Logo"
            className="h-16 w-auto"
          />
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <X
              size={30}
              className="text-black cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <Menu
              size={30}
              className="text-black cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-lg font-semibold text-black">
          <a href="#about-us" className="hover:text-orange-400 transition-colors">About us</a>
          <a href="#works" className="hover:text-orange-400 transition-colors">Projects</a>
          <a href="#services" className="hover:text-orange-400 transition-colors">Services</a>
          <a href="#workflow" className="hover:text-orange-400 transition-colors">Workflow</a>
          <a href="#clients" className="hover:text-orange-400 transition-colors">Clients</a>
          <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md text-black flex flex-col items-center py-4 space-y-4 text-lg font-semibold">
          <a href="#about-us" onClick={() => setIsMenuOpen(false)}>About us</a>
          <a href="#works" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#workflow" onClick={() => setIsMenuOpen(false)}>Workflow</a>
          <a href="#clients" onClick={() => setIsMenuOpen(false)}>Clients</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
