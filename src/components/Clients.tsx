import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ClientsProps {
  logos: string[];
}

const Clients: React.FC<ClientsProps> = ({ logos }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref} className="bg-gray-100 py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`md:col-span-1 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <h2 className="text-xl font-semibold text-black">Trusted by many</h2>
          </div>
          <div className={`md:col-span-2 transition-all duration-500 ease-out delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <p className="text-xl text-gray-700 leading-relaxed">
              We are grateful for all those exceptional designers who have placed trust in our brand. We value not only the business ties that link us together but also the personal relationships that have been forged throughout the years.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-12">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${200 + index * 40}ms` }}
            >
              <img 
                src={logo} 
                alt={`Client logo ${index + 1}`} 
                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 cursor-pointer transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;