import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FaWhatsapp } from 'react-icons/fa';  // Import WhatsApp icon from react-icons

const ContactCTA: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });

  const title = "Ready to discuss your next project?";
  const text = "If you need guidance on what information should be provided, simply fill out our proposal request form below.";
  const buttonText = "Fill out form";
  const imageUrl = "https://images.unsplash.com/photo-1581362512932-aaca443b7161?q=80&w=1920&auto=format&fit=crop";

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);  // Reset after 1.5 seconds
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const whatsappLink = `https://wa.me/?text=Hi, I'm interested in your services. Name: ${form.name}, Email: ${form.email}, Message: ${form.message}`;

  return (
    <section ref={ref} className="bg-black py-16 px-6 md:px-12 lg:px-24">
      {/* Main Form and Content */}
      <div className="flex flex-col md:flex-row gap-12 pt-12">
        <div className="flex items-center justify-between w-full space-x-8">
          {/* Left Section: Text */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Contact Form</h2>
            <p className="text-lg text-gray-200">{text}</p>

            {/* WhatsApp Button with Icon - Centered */}
            <div className="flex justify-center mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-green-700 text-white px-4 py-2 font-semibold hover:bg-green-800 transition-all duration-700 ease-out delay-300 w-auto justify-center rounded-lg"
              >
                {/* Increased Icon Size */}
                <FaWhatsapp className="mr-2 text-2xl" /> {/* Larger WhatsApp Icon */}
                <span className="text-lg">Contact via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="w-full md:w-1/2 space-y-4">
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
                    className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500 text-sm"
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
                    className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500 text-sm"
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
                    className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500 text-sm"
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
                    className="w-full px-3 py-2 rounded bg-[#23201b] text-white border border-orange-500 focus:outline-none focus:border-white placeholder-gray-500 text-sm"
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
      </div>
    </section>
  );
};

export default ContactCTA;
