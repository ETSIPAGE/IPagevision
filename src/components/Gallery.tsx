import React, { useState, useEffect, useCallback } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';


interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentLightboxImages, setCurrentLightboxImages] = useState<GalleryImage[]>([]);

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

  const openLightbox = (image: GalleryImage, rowImages: GalleryImage[]) => {
    setSelectedImage(image);
    setCurrentLightboxImages(rowImages);
    setLightboxOpen(true);
  };

  const handleDownload = async (e: React.MouseEvent, image: GalleryImage) => {
    e.stopPropagation();

    // Clean filename: "title_id.jpg"
    const fileName = `${image.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${image.id}.jpg`;

    try {
      // 1. Fetch the image data. 
      // Adding a timestamp (?t=...) is essential for S3 cross-origin downloads
      // because it prevents the browser from using a restricted cached version.
      const response = await fetch(`${image.src}?t=${Date.now()}`, {
        method: 'GET',
        mode: 'cors'
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();

      // 2. Create a local temporary URL for the downloaded blob
      const blobUrl = window.URL.createObjectURL(blob);

      // 3. Trigger the browser to save the file
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 4. Cleanup
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 200);

    } catch (error) {
      console.error('Direct download failed:', error);
      // Fallback that doesn't use target="_blank" to try and avoid new tab
      const link = document.createElement('a');
      link.href = image.src;
      link.download = fileName;
      link.click();
    }
  };

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (!selectedImage || currentLightboxImages.length === 0) return;
    const currentIndex = currentLightboxImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    setSelectedImage(currentLightboxImages[prevIndex]);
  }, [selectedImage, currentLightboxImages]);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    if (!selectedImage || currentLightboxImages.length === 0) return;
    const currentIndex = currentLightboxImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % currentLightboxImages.length;
    setSelectedImage(currentLightboxImages[nextIndex]);
  }, [selectedImage, currentLightboxImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  return (
    <div className="bg-black py-8 overflow-hidden">
      {/* Row 1: 2 images, scroll left to right */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex animate-scroll-left-row1">
          {[...row1, ...row1].map((image, index) => (
            <div
              key={`row1-${image.id}-${index}`}
              className="relative overflow-hidden group flex-shrink-0 mx-1 cursor-pointer"
              onClick={() => openLightbox(image, row1)}
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
              onClick={() => openLightbox(image, row2)}
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
              onClick={() => openLightbox(image, row3)}
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
              onClick={() => openLightbox(image, row4)}
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
          <div className="absolute top-4 right-4 flex items-center gap-6 z-10">
            <button
              className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={(e) => handleDownload(e, selectedImage)}
              title="Download Image"
            >
              <Download size={24} />
            </button>
            <button
              className="text-white text-4xl leading-none hover:text-gray-300 transition-all duration-300 hover:scale-110"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-10"
            onClick={(e) => handlePrev(e)}
            title="Previous Image"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
          </button>
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 z-10"
            onClick={(e) => handleNext(e)}
            title="Next Image"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
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