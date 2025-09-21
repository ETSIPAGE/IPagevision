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
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ipagevision/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.72 0-.93.784-1.72 1.75-1.72s1.75.79 1.75 1.72c0 .93-.784 1.72-1.75 1.72zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.454 3.5 12 3.5 12 3.5s-7.454 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.12 0 12 0 12s0 3.88.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.546 20.5 12 20.5 12 20.5s7.454 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.88 24 12 24 12s0-3.88-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ipagevision/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/ipagevision',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22.162 0h-4.327l-5.835 8.228L6.495 0H.338l7.49 10.825L.021 24h4.327l6.13-8.646L17.505 24h6.157l-7.49-10.825L22.162 0zm-2.13 22.153l-5.98-8.646-6.13 8.646H2.13l7.49-10.825L2.13 1.847h3.922l5.835 8.228 5.835-8.228h3.922l-7.49 10.825 7.49 10.825h-3.922z" />
      </svg>
    ),
  },
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
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 border-b border-gray-800">
          <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-4xl md:text-5xl text-white font-light">Got a project in mind?</h2>
            <button
              type="button"
              className="text-white text-2xl mt-4 inline-block hover:text-gray-300"
              onClick={() => setShowModal(true)}
            >
              Get Started &rarr;
            </button>
      {/* Modal Contact Form */}
      {showModal && (
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
      )}
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul>
                <li className="mb-2"><a href="#about-us" className="hover:text-white">About us</a></li>
                <li className="mb-2"><a href="#our-team" className="hover:text-white">Our Team</a></li>
                <li className="mb-2"><a href="#works" className="hover:text-white">Works</a></li>
                <li className="mb-2"><a href="#newsroom" className="hover:text-white">Newsroom</a></li>
                <li className="mb-2"><a href="#clients" className="hover:text-white">Clients</a></li>
                <li className="mb-2"><a href="#contact" className="hover:text-white">Contact</a></li>
                <li className="mb-2"><a href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-center">
          <div className={`transition-all duration-500 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p>IPage Vision Head Studio,</p>
            <p>Blk 641A, Punggol Drive, Singapore 821641</p>
          </div>
          <div className={`transition-all duration-500 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p>info@ipagevision.com</p>
            <p>+65 8216 1261</p>
          </div>
          <div className="flex items-center md:justify-end space-x-2">
            {SOCIALS.map((social, index) => (
              <div
                key={social.name}
                className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${500 + index * 80}ms` }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"
                >
                  {social.icon}
                </a>
              </div>
            ))}
          </div>
        </div>

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

export default Footer;