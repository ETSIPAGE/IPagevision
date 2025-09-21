import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ContactCTA: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  const title = "Ready to discuss your next project?";
  const text = "If you need guidance on what information should be provided, simply fill out our proposal request form below.";
  const buttonText = "Fill out form";
  const imageUrl = "https://images.unsplash.com/photo-1581362512932-aaca443b7161?q=80&w=1920&auto=format&fit=crop";

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

  return (
    <section ref={ref} className="bg-black py-16 px-6 md:px-12 lg:px-24">
        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="relative z-10 p-12 md:p-24 max-w-2xl">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {title}
              </h2>
              <p className={`text-lg text-gray-200 mb-8 transition-all duration-700 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {text}
              </p>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className={`group inline-flex items-center bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {buttonText}
                <span className="ml-2 font-light transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
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
        </div>
    </section>
  );
};

export default ContactCTA;
