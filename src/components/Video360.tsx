import React, { useState } from 'react';
import { X } from 'lucide-react';

type VideoItem = {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  image: string;
};

const VIDEOS: VideoItem[] = [
  {
    id: 'vid1',
    title: 'Experience the World in 360°',
    url: 'https://youtu.be/f03tPwABYoY',
    embedUrl: 'https://www.youtube.com/embed/f03tPwABYoY?autoplay=1&rel=0',
    image: 'https://i.ytimg.com/vi/f03tPwABYoY/hqdefault.jpg',
  },
  {
    id: 'vid2',
    title: 'Explore Every Angle in 360°',
    url: 'https://youtu.be/2-1FTeDHbQI',
    embedUrl: 'https://www.youtube.com/embed/2-1FTeDHbQI?autoplay=1&rel=0',
    image: 'https://i.ytimg.com/vi/2-1FTeDHbQI/hqdefault.jpg',
  },
  {
    id: 'vid3',
    title: 'Look Around in 360°',
    url: 'https://youtu.be/297fMZkpgS8',
    embedUrl: 'https://www.youtube.com/embed/297fMZkpgS8?autoplay=1&rel=0',
    image: 'https://i.ytimg.com/vi/297fMZkpgS8/hqdefault.jpg',
  },
];

const Video360: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 text-white min-h-[70vh]">
      {!activeVideo && (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">360° Video</h1>
          <p className="text-gray-300 mb-10">Choose a video to open an immersive 360° experience.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v) => (
              <button
                key={v.id}
                className="group rounded-lg border border-gray-700/50 bg-gray-800/40 hover:bg-gray-800/70 transition-colors p-5 text-left cursor-pointer"
                onClick={() => setActiveVideo(v)}
              >
                <div className="aspect-video rounded-md overflow-hidden mb-4 bg-gray-800/60">
                  <img
                    src={v.image}
                    alt={`${v.title} thumbnail`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${v.url.split('/').pop()}/0.jpg`;
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{v.title}</h3>
                    <p className="text-sm text-gray-400">Click to open</p>
                  </div>
                  <span className="text-orange-400">→</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black">
          <button
            className="absolute right-6 top-6 z-50 inline-flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white p-3 transition-colors backdrop-blur-sm cursor-pointer"
            aria-label="Close"
            onClick={() => setActiveVideo(null)}
          >
            <X size={24} />
          </button>
          <iframe
            title={activeVideo.title}
            src={activeVideo.embedUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Video360;
