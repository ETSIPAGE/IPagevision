
import React from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isLoading}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        {/* White glow background */}
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 60%, transparent 100%)',
            filter: 'blur(24px)',
            zIndex: 0,
            pointerEvents: 'none',
            animation: 'glowPulse 2s infinite alternate',
          }}
        ></div>
        <img
          src="/images/new-logo.png.png"
          alt="IPage Vision Logo"
          className="w-48 h-48 object-contain animate-pulse drop-shadow-lg relative"
          style={{ filter: 'drop-shadow(0 0 24px #00ffff88)', zIndex: 1 }}
        />
        <style>{`
          @keyframes glowPulse {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;