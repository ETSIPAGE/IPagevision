import React from 'react';
import { GalleryImage } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="bg-black py-4">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-2 p-2">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={`relative overflow-hidden group transition-all duration-700 ease-out ${image.gridClass} ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img src={image.src} alt={image.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p className="text-gray-300">{image.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
