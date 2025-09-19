import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SectionProps {
  title: string;
  text: string;
  children?: React.ReactNode;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

const Section: React.FC<SectionProps> = ({ title, text, children, imageUrl, imagePosition = 'left' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  const textContent = (
    <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${imagePosition === 'left' || !imageUrl ? 'translate-x-8' : '-translate-x-8'}`}`}>
      <h2 className="text-3xl font-semibold text-white mb-6">{title}</h2>
      <p className="text-xl text-gray-300 leading-relaxed">
        {text}
      </p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );

  const imageContent = imageUrl && (
    <div className={`relative h-96 md:h-full w-full overflow-hidden transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );

  if (imageUrl) {
    return (
      <section ref={ref} className="bg-black py-16 md:py-0 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[70vh] gap-12 md:gap-0">
            <div className={`p-6 md:p-12 lg:p-24 ${imagePosition === 'right' ? 'md:order-first' : 'md:order-last'}`}>
              {textContent}
            </div>
            <div className="h-full">
              {imageContent}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback for sections without an image (original component behavior)
  return (
    <section ref={ref} className="bg-black py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`md:col-span-1 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
          </div>
          <div className={`md:col-span-2 transition-all duration-500 ease-out delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <p className="text-xl text-gray-300 leading-relaxed">
              {text}
            </p>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;