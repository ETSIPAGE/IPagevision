import React, { useState } from 'react';
import { NavLinkCategory } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FooterProps {
  links: NavLinkCategory[];
}

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/IPage-Vision/61581149700095/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
      </svg>
    ),
  },
  // Other social links...
];

const Footer: React.FC<FooterProps> = ({ links }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setShowModal(false), 1500);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="bg-[#121212] text-gray-400 py-16 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">
        {/* Top Section with IPage Vision logo and description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 border-b border-gray-800">
          {/* <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-5xl text-white font-light">Got a project in mind?</h2>
            <button
              type="button"
              className="text-white text-2xl mt-4 inline-block hover:text-gray-300"
              onClick={() => setShowModal(true)}
            >
              Get Started &rarr;
            </button>
          </div> */}

          {/* Description and Logo of IPage Vision */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-4">
              {/* <img
                src="/imaages/new-logo.png.png"  // Replace this with the correct logo path
                alt="IPage Vision Logo"
                className="w-16 h-16"
              /> */}
              <h3 className="text-white text-lg font-semibold">IPage Vision</h3>
            </div>
            <p className="text-sm text-gray-400">
              IPage Vision is an elite architectural visualization studio based in Singapore, specializing in photorealistic 3D renderings and immersive digital experiences. We collaborate with architects, designers, and developers to bring visions to life.
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <ul>
          <li className="mb-2"><a href="#about-us" className="hover:text-white">About us</a></li>
          <li className="mb-2"><a href="#works" className="hover:text-white">Projects</a></li>
          <li className="mb-2"><a href="#services" className="hover:text-white">Services</a></li>
          <li className="mb-2"><a href="#workflow" className="hover:text-white">Workflow</a></li>
          <li className="mb-2"><a href="#clients" className="hover:text-white">Clients</a></li>
          <li className="mb-2"><a href="#contact" className="hover:text-white">Contact</a></li>
        </ul>

        {/* Modal Contact Form */}
        {showModal && (
          <ModalContactForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setShowModal={setShowModal}
            submitted={submitted}
          />
        )}

        {/* Bottom Section */}
        <div className={`pt-8 mt-8 border-t border-gray-800 flex flex-wrap justify-between items-center gap-4 transition-all duration-500 ease-out delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm">&copy; {new Date().getFullYear()} IPage Vision Visual Solutions Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</a>
            <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          </div>
          <button onClick={scrollToTop} className="text-sm hover:text-white">Back To Top &uarr;</button>
        </div>
      </div>
    </footer>
  );
};

const ModalContactForm: React.FC<any> = ({ form, handleChange, handleSubmit, setShowModal, submitted }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gradient-to-br from-[#18130a] via-[#23201b] to-[#18130a] border border-orange-500 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-orange-400 hover:text-white text-2xl"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-400">Contact Us</h2>
        {submitted ? (
          <div className="text-orange-300 text-center py-8">Thank you! We'll be in touch soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-orange-300 mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-orange-300 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-orange-300 mb-1" htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-orange-300 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-orange-400 text-black font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Footer;
