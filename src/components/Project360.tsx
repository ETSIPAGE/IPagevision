import React, { useState } from 'react';
import { X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  url: string;
  image?: string;
};

const PROJECTS: Project[] = [
  { id: 'pro1', title: 'Raghuvir Spelito', url: 'https://ipageums.com/360/1/', image: '/images/pro1.png' },
  { id: 'pro2', title: 'GHR Callisto', url: 'https://ipageums.com/360/2/', image: '/images/pro2.png' },
  { id: 'pro3', title: 'Savaaya Convention', url: 'https://ipageums.com/360/3/', image: '/images/pro3.png' },
];

const Project360: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 text-white">
      {!activeUrl && (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">360° Project</h1>
          <p className="text-gray-300 mb-10">Choose a project to open an immersive 360° experience.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <button
                key={p.id}
                className="group rounded-lg border border-gray-700/50 bg-gray-800/40 hover:bg-gray-800/70 transition-colors p-5 text-left"
                onClick={() => setActiveUrl(p.url)}
              >
                <div className="aspect-video rounded-md overflow-hidden mb-4 bg-gray-800/60">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.title} thumbnail`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <span className="group-hover:text-white transition-colors">{p.title.toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-400">Click to open</p>
                  </div>
                  <span className="text-orange-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeUrl && (
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1400px] h-[82vh] md:h-[88vh]">
            <button
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white p-2"
              aria-label="Close"
              onClick={() => setActiveUrl(null)}
            >
              <X size={18} />
            </button>
            <iframe
              title="360 Project"
              src={activeUrl}
              className="w-full h-full bg-black"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Project360;
