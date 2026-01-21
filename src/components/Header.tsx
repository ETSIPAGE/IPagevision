import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // hamburger & close icons

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/images/ipagevisionlogonew.png"
            alt="IPage Vision Logo"
            className="h-16 w-auto scale-150 origin-left"

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
          <Link to="/#about-us" className="hover:text-orange-400 transition-colors">About us</Link>
          <Link to="/#works" className="hover:text-orange-400 transition-colors">Projects</Link>
          <Link to="/360" className="hover:text-orange-400 transition-colors">360°Viz</Link>
          <Link to="/#services" className="hover:text-orange-400 transition-colors">Services</Link>

          <Link to="/#workflow" className="hover:text-orange-400 transition-colors">Workflow</Link>
          <Link to="/#clients" className="hover:text-orange-400 transition-colors">Clients</Link>
          <Link to="/#contact" className="hover:text-orange-400 transition-colors">Contact</Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md text-black flex flex-col items-center py-4 space-y-4 text-lg font-semibold">
          <Link to="/#about-us" onClick={() => setIsMenuOpen(false)}>About us</Link>
          <Link to="/#works" onClick={() => setIsMenuOpen(false)}>Projects</Link>
          <Link to="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/360" onClick={() => setIsMenuOpen(false)}>360°Viz</Link>
          <Link to="/#workflow" onClick={() => setIsMenuOpen(false)}>Workflow</Link>
          <Link to="/#clients" onClick={() => setIsMenuOpen(false)}>Clients</Link>
          <Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;