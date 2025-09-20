import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ContactCTA: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  const title = "Ready to discuss your next project?";
  const text = "If you need guidance on what information should be provided, simply fill out our proposal request form below.";
  const buttonText = "Fill out form";
  const buttonLink = "#"; // Placeholder link
  const imageUrl = "https://images.unsplash.com/photo-1581362512932-aaca443b7161?q=80&w=1920&auto=format&fit=crop";

  return (
    <section ref={ref} className="bg-black py-16 px-6 md:px-12 lg:px-24">
        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="relative z-10 p-12 md:p-24 max-w-2xl">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {title}
              </h2>
              <p className={`text-lg text-gray-200 mb-8 transition-all duration-700 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {text}
              </p>
              <a
                href={buttonLink}
                className={`group inline-flex items-center bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {buttonText}
                <span className="ml-2 font-light transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </a>
          </div>
        </div>
    </section>
  );
};

export default ContactCTA;
