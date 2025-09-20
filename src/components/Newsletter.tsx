import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Newsletter: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here.
    alert('Thank you for subscribing!');
  };

  return (
    <div ref={ref} className="bg-black border-t border-b border-gray-800 py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className={`container mx-auto text-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Stay in the loop</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Get the latest updates on our projects, insights from the industry, and exclusive content delivered right to your inbox.
        </p>
        <form 
          className="max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email-input" className="sr-only">Email address</label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
            required
            aria-label="Email Address"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-black px-8 py-3 font-semibold hover:bg-gray-200 transition-colors duration-300 flex-shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
