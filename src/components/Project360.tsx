import React, { useState } from 'react';
import { X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  url: string;
  image?: string;
};

const PROJECTS: Project[] = [
  { id: 'pro1', title: 'Raghuvir Spelito', url: 'https://ipageums.com/360Viz/1/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Raghuvir+Spiletto.png' },
  { id: 'pro2', title: 'GHR Callisto', url: 'https://ipageums.com/360Viz/2/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/GHR+Callisto.png' },
  { id: 'pro3', title: 'Savaaya Convention', url: 'https://ipageums.com/360Viz/3/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Saavya.png' },
  { id: 'pro4', title: 'Interior 360Viz', url: 'https://www.ipageums.com/360Viz/CloveTech/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/screenshot+(6).jpg' },
  { id: 'pro5', title: 'DSR The World', url: 'https://www.ipageums.com/360Viz/TheWorld/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/DSR+The+World.png' },
  { id: 'pro6', title: 'Vensa One', url: 'https://www.ipageums.com/360Viz/Vensa/One/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Vensa+One.png' },
  { id: 'pro7', title: 'Vensa Breeze', url: 'https://www.ipageums.com/360Viz/Vensa/Breeze/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Vensa+Breeze.png' },
  { id: 'pro8', title: 'Poulomi Palazzo', url: 'https://www.ipageums.com/360Viz/Poulomi/Palazzo/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Poulomi+Palazzo.png' },
  { id: 'pro9', title: 'Aspire Ameya', url: 'https://www.ipageums.com/360Viz/Aspire/Ameya/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Aspire+Ameya.png' },
  { id: 'pro10', title: 'Aspire Bodakonda', url: 'https://www.ipageums.com/360Viz/Aspire/Bodakonda/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Bodakonda.png' },
  { id: 'pro11', title: 'Ooty', url: 'https://www.ipageums.com/360Viz/Ooty/Realion/', image: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Ooty.png' },

];

const Project360: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 text-white">
      {!activeUrl && (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">360°Viz</h1>
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
        <div className="fixed inset-0 z-[100] bg-black">
          <button
            className="absolute right-6 top-6 z-50 inline-flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white p-3 transition-colors backdrop-blur-sm"
            aria-label="Close"
            onClick={() => setActiveUrl(null)}
          >
            <X size={24} />
          </button>
          <iframe
            title="360 Project"
            src={activeUrl}
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Project360;