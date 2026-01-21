import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Distribute images into rows with specified counts
  const row1Count = 2;
  const row2Count = 6;
  const row3Count = 4;
  const row4Count = 5;

  const row1 = images.slice(0, row1Count);
  const row2 = images.slice(row1Count, row1Count + row2Count);
  const row3 = images.slice(row1Count + row2Count, row1Count + row2Count + row3Count);
  const row4 = images.slice(row1Count + row2Count + row2Count, row1Count + row2Count + row3Count + row4Count);

  // All rows use the same image size as row 1
  const imageHeight = 'h-[500px]';
  const imageWidth = 'w-[calc(50vw-1rem)]'; // Same as row 1 (2 images per row)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-black py-8 overflow-hidden">
      {/* Row 1: 2 images, scroll left to right */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex animate-scroll-left-row1">
          {[...row1, ...row1].map((image, index) => (
            <div
              key={`row1-${image.id}-${index}`}
              className="relative overflow-hidden group flex-shrink-0 mx-1 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className={`${imageHeight} ${imageWidth}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-gray-300">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: 6 images, scroll right to left */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex animate-scroll-right-row2">
          {[...row2, ...row2].map((image, index) => (
            <div
              key={`row2-${image.id}-${index}`}
              className="relative overflow-hidden group flex-shrink-0 mx-1 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className={`${imageHeight} ${imageWidth}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-gray-300">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: 4 images, scroll left to right */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex animate-scroll-left-row3">
          {[...row3, ...row3].map((image, index) => (
            <div
              key={`row3-${image.id}-${index}`}
              className="relative overflow-hidden group flex-shrink-0 mx-1 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className={`${imageHeight} ${imageWidth}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-gray-300">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: 5 images, scroll right to left */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-right-row4">
          {[...row4, ...row4].map((image, index) => (
            <div
              key={`row4-${image.id}-${index}`}
              className="relative overflow-hidden group flex-shrink-0 mx-1 cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className={`${imageHeight} ${imageWidth}`}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-opacity duration-300">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-gray-300">{image.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Popup */}
      {lightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl z-10"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Row 1: 2 images → 20s */
        .animate-scroll-left-row1 {
          animation: scrollLeft 20s linear infinite;
          display: inline-flex;
        }
        
        /* Row 2: 6 images → 60s */
        .animate-scroll-right-row2 {
          animation: scrollRight 60s linear infinite;
          display: inline-flex;
        }
        
        /* Row 3: 4 images → 50s */
        .animate-scroll-left-row3 {
          animation: scrollLeft 50s linear infinite;
          display: inline-flex;
        }
        
        /* Row 4: 5 images → 40s */
        .animate-scroll-right-row4 {
          animation: scrollRight 40s linear infinite;
          display: inline-flex;
        }

        /* Pause animation on hover */
        .animate-scroll-left-row1:hover,
        .animate-scroll-right-row2:hover,
        .animate-scroll-left-row3:hover,
        .animate-scroll-right-row4:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Gallery;