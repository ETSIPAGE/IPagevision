import React, { useState, useEffect } from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoading) {
      // Short delay to ensure the component is mounted before starting the animation.
      timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
    } else {
      // Reset animation state if loader is hidden
      setIsAnimating(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isLoading}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-center text-4xl font-bold" aria-label="IPage Vision">
        {/* The 'IPAGE' logo part, rolling from the left */}
        <div
          className={`transition-transform duration-1000 ease-in-out ${isAnimating ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="bg-white text-black px-5 py-2 flex items-center justify-center font-extrabold tracking-widest">
            IPAGE
          </span>
        </div>
        
        {/* The 'VISION' text part, rolling from the right */}
        <div
          className={`transition-transform duration-1000 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span
            className="block ml-4 tracking-wider whitespace-nowrap"
          >
            VISION
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;