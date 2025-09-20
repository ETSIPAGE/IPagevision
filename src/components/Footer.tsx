import React from 'react';
import { NavLinkCategory } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';


interface FooterProps {
  links: NavLinkCategory[];
}

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
    {children}
  </a>
);

const Footer: React.FC<FooterProps> = ({ links }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const socialIcons = ['F', 'in', 'V', 'Yt', 'Be'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer ref={ref} className="bg-[#121212] text-gray-400 py-16 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 border-b border-gray-800">
          <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-5xl text-white font-light">Got a project in mind?</h2>
            <a href="#" className="text-white text-2xl mt-4 inline-block hover:text-gray-300">
              Let's talk &rarr;
            </a>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-500 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {links.map(category => (
              <div key={category.title}>
                <h3 className="text-white font-semibold mb-4">{category.title}</h3>
                <ul>
                  {category.links.map(link => (
                    <li key={link.name} className="mb-2">
                      <a href={link.href} className="hover:text-white">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-center">
          <div className={`transition-all duration-500 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p>IPage Vision Head Studio,</p>
            <p>Blk 641A, Punggol Drive, Singapore 821641</p>
          </div>
          <div className={`transition-all duration-500 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p>info@ipagevision.com</p>
            <p>+65 9090 3217</p>
          </div>
          <div className="flex items-center md:justify-end space-x-2">
            {socialIcons.map((icon, index) => (
              <div 
                key={icon}
                className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${500 + index * 80}ms`}}
              >
                <SocialIcon>{icon}</SocialIcon>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 mt-8 border-t border-gray-800 flex flex-wrap justify-between items-center gap-4 transition-all duration-500 ease-out delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm">&copy; {new Date().getFullYear()} IPage Vision Visual Solutions Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
             <a href="#" className="hover:text-white">Terms & Conditions</a>
             <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
          <button onClick={scrollToTop} className="text-sm hover:text-white">Back To Top &uarr;</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;