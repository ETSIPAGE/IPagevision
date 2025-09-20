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
      <div className="flex flex-col items-center relative" aria-label="Loading IPage Vision">
        {/* Architectural visualization themed animation */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {/* 3D cube structure */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-24 h-24 transition-all duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                transform: isAnimating ? 'rotateX(30deg) rotateY(30deg)' : 'rotateX(0) rotateY(0)',
                transformStyle: 'preserve-3d',
                transitionDelay: '200ms'
              }}
            >
              {/* Front face */}
              <div className="absolute w-full h-full border-2 border-cyan-400 opacity-80"
                style={{ 
                  transform: 'translateZ(40px)',
                  boxShadow: isAnimating ? '0 0 15px rgba(0,255,255,0.5)' : 'none'
                }}
              ></div>
              
              {/* Back face */}
              <div className="absolute w-full h-full border-2 border-cyan-400 opacity-80"
                style={{ 
                  transform: 'translateZ(-40px) rotateY(180deg)',
                  boxShadow: isAnimating ? '0 0 15px rgba(0,255,255,0.5)' : 'none'
                }}
              ></div>
              
              {/* Right face */}
              <div className="absolute w-full h-full border-2 border-cyan-300 opacity-60"
                style={{ 
                  transform: 'rotateY(90deg) translateZ(40px)',
                  boxShadow: isAnimating ? '0 0 10px rgba(0,255,255,0.3)' : 'none'
                }}
              ></div>
              
              {/* Left face */}
              <div className="absolute w-full h-full border-2 border-cyan-300 opacity-60"
                style={{ 
                  transform: 'rotateY(-90deg) translateZ(40px)',
                  boxShadow: isAnimating ? '0 0 10px rgba(0,255,255,0.3)' : 'none'
                }}
              ></div>
              
              {/* Top face */}
              <div className="absolute w-full h-full border-2 border-white opacity-40"
                style={{ 
                  transform: 'rotateX(90deg) translateZ(40px)',
                  boxShadow: isAnimating ? '0 0 8px rgba(255,255,255,0.2)' : 'none'
                }}
              ></div>
              
              {/* Bottom face */}
              <div className="absolute w-full h-full border-2 border-white opacity-40"
                style={{ 
                  transform: 'rotateX(-90deg) translateZ(80px)',
                  boxShadow: isAnimating ? '0 0 8px rgba(255,255,255,0.2)' : 'none'
                }}
              ></div>
            </div>
          </div>
          
          {/* Rotating rings representing design elements */}
          <div 
            className={`absolute rounded-full border-2 border-white opacity-30 transition-all duration-1000 ${isAnimating ? 'opacity-30 w-full h-full' : 'opacity-0 w-0 h-0'}`}
            style={{ 
              transitionDelay: '400ms',
              animation: isAnimating ? 'spin 8s linear infinite' : 'none'
            }}
          ></div>
          
          <div 
            className={`absolute rounded-full border-2 border-cyan-400 opacity-50 transition-all duration-1000 ${isAnimating ? 'opacity-50 w-3/4 h-3/4' : 'opacity-0 w-0 h-0'}`}
            style={{ 
              transitionDelay: '600ms',
              animation: isAnimating ? 'spin 12s linear infinite reverse' : 'none'
            }}
          ></div>
        </div>
        
        {/* IPAGE VISION Logo */}
        <div className="flex items-center justify-center text-4xl font-bold mb-6">
          {/* The 'IPAGE' part */}
          <div
            className={`transition-all duration-700 ease-out ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ 
              transitionDelay: '800ms',
              textShadow: isAnimating ? '0 0 10px rgba(255,255,255,0.7)' : 'none'
            }}
          >
            <span className="text-white font-extrabold tracking-widest">
              IPAGE
            </span>
          </div>
          
          {/* The 'VISION' part */}
          <div
            className={`transition-all duration-700 ease-out ml-4 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ 
              transitionDelay: '1000ms',
              textShadow: isAnimating ? '0 0 15px rgba(0,255,255,0.8)' : 'none'
            }}
          >
            <span className="text-cyan-300 tracking-wider whitespace-nowrap">
              VISION
            </span>
          </div>
        </div>
        
        {/* Architectural visualization themed progress indicator */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-cyan-400 to-white transition-all duration-1000 ease-out rounded-full ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              transitionDelay: '1200ms',
              width: isAnimating ? '100%' : '0%',
              boxShadow: isAnimating ? '0 0 10px rgba(0,255,255,0.7)' : 'none'
            }}
          ></div>
        </div>
        
        {/* Loading text with architectural theme */}
        <div 
          className={`mt-4 text-gray-400 text-sm font-light tracking-widest transition-all duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1400ms' }}
        >
          CREATING VISUAL NARRATIVES
        </div>
      </div>
      
      {/* Add keyframes for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;