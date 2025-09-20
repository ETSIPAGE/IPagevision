import React, { useState, useEffect } from 'react';

interface HeroProps {
  imageUrl: string;
  superTitle: string;
  title: string;
  actionText: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl, superTitle, title, actionText }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative h-screen bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative container mx-auto px-6 md:px-12 pb-20 text-white w-full">
        <div className="flex justify-between items-end">
          <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <p className="text-lg text-gray-200">{superTitle}</p>
            <h1 className="text-5xl md:text-7xl font-bold mt-2">{title}</h1>
          </div>
          <a href="#" className={`hidden md:flex items-center space-x-3 text-lg font-semibold hover:text-gray-300 transition-all duration-1000 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {actionText.includes('showreel') && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{actionText}</span>
          </a>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-70">
          <div className={`w-0.5 h-10 bg-white origin-top transition-transform duration-1000 ease-out delay-500 ${isLoaded ? 'scale-y-100' : 'scale-y-0'}`}></div>
          <div className={`w-4 h-4 border-2 border-white rounded-full transition-opacity duration-500 delay-[1500ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
