import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Section from './components/Section';
import ContactCTA from './components/ContactCTA';
import Loader from './components/Loader';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import SubSection from './components/SubSection';
import { GALLERY_IMAGES, CLIENT_LOGOS, NAV_LINKS } from './constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <div
        className={`bg-black text-white font-sans antialiased transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <Routes>
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="*"
            element={
              <main>
                <Hero
                  imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/8.png"
                  superTitle="Architectural Visualization"
                  title="Bringing your vision to life"
                  actionText="Watch our showreel"
                />
                <div id="about-us">
                  <Section
                    title="About Us"
                    
                    text="IPage Vision is an elite architectural visualization studio, based in Singapore and India, and servicing clients worldwide. As a division of IPage UM Services Pvt. Ltd (IPAGE UMS), we specialize in high-end 3D renderings and immersive digital experiences. Our team of architectural designers, 3D artists, and visual storytellers is dedicated to bringing architectural concepts to life. We work closely with architects, developers, and designers, turning their ideas into stunning visual narratives that captivate and inspire. Our passion for detail and innovation ensures that each project is a true reflection of our client's vision, delivering cutting-edge, photorealistic visuals that push the boundaries of design and creativity."
                   textAlign="justify"
                   />
                </div>
                <div id="our-team">
                  <Section
                    title="Our Team"
                    text="Our strength lies in our diversity. We are a collective of architects, interior designers, civil engineers, artists, filmmakers and tech enthusiasts, united by a shared passion for visual storytelling. This multidisciplinary approach allows us to tackle complex challenges with a unique perspective, pushing the boundaries of what's possible in digital representation."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/team.jpeg"
                    imagePosition="left"
                  />
                </div>
                <Section
                  title="Our Projects"
                  text="Every project is a unique journey. We dive deep into the essence of the design, working closely with our clients to understand their vision. From initial concept to final render, our process is built on collaboration, precision, and a relentless pursuit of artistic excellence. The result is not just a visualization, but a story that resonates and inspires."
                />
                <div id="works">
                  <Gallery images={GALLERY_IMAGES} />
                </div>
                <div id="services">
                  <Section
                    title="Services"
                    text="We operate at the intersection of art and technology, offering a suite of visualization services tailored to diverse industries. Our services ensure that every project, regardless of its scale or complexity, is communicated with clarity, impact, and artistic integrity."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/sdd.png"
                    imagePosition="left"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                      <SubSection id="expertise-architecture-sub" title="Architecture">
                        Transforming blueprints into photorealistic renderings and animations.
                      </SubSection>
                      <SubSection id="expertise-interior" title="Interior Visualisation">
                        Detailing interior spaces with stunning accuracy and aesthetic appeal.
                      </SubSection>
                      <SubSection id="expertise-3d-modelling" title="3D Modelling">
                        Building precise and intricate 3D models for any architectural concept.
                      </SubSection>
                      <SubSection id="expertise-vr-ar" title="VR/AR Walkthrough">
                        Creating immersive virtual and augmented reality experiences for designs.
                      </SubSection>
                      <SubSection id="expertise-construction" title="Construction Monitoring">
                        Providing visual progress tracking and documentation for construction projects.
                      </SubSection>
                      <SubSection id="expertise-real-estate" title="Real Estate">
                        Creating compelling visual assets for property marketing and sales.
                      </SubSection>
                    </div>
                  </Section>
                </div>
                <div id="workflow">
                  <Section
                    title="Workflow"
                    text="Our workflow is designed to ensure seamless collaboration, transparency, and efficiency at every stage of your project. From initial consultation to final delivery, we keep you informed and involved, making the process smooth and enjoyable."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/Newsletter.jpeg"
                    imagePosition="right"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mt-8">
                      <SubSection id="workflow-consultation" title="Consultation">
                        We begin by understanding your vision, requirements, and goals to tailor our approach.
                      </SubSection>
                      <SubSection id="workflow-design" title="Design & Visualization">
                        Our team crafts detailed visualizations, keeping you updated with regular previews and feedback sessions.
                      </SubSection>
                      <SubSection id="workflow-delivery" title="Delivery & Support">
                        We deliver high-quality results on time and provide ongoing support to ensure your satisfaction.
                      </SubSection>
                    </div>
                  </Section>
                </div>
                <div id="clients">
                  <Clients logos={CLIENT_LOGOS} />
                </div>
                <div id="career-positions">
                  <Section
                    title="Join Our Team"
                    text="We are always looking for passionate and talented individuals to join our growing team. If you are driven by creativity, innovation, and a desire to create exceptional work, we would love to hear from you. Explore our open positions and discover a community where you can thrive."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/Join+Our+Team.jpeg"
                    imagePosition="left"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                      <SubSection id="career-community" title="Community & Culture">
                        A collaborative environment that fosters growth, learning, and mutual respect.
                      </SubSection>
                      <SubSection id="career-articles" title="Useful Articles">
                        Insights and knowledge from our team on the latest trends and techniques in visualization.
                      </SubSection>
                    </div>
                  </Section>
                </div>
                <div id="academy">
                  <Section
                    title="IPage Vision Academy"
                    text="The Academy is our commitment to the next generation of digital artists. Through mentorship, workshops, and intensive training programs, we cultivate emerging talent and provide a platform for creative exploration. It's our way of giving back to the community and investing in the future of our craft."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/IPage+Vision+Academy.jpeg"
                    imagePosition="right"
                  />
                </div>
                <div id="partners-pulze">
                  <Section
                    title="Our Partners"
                    text="Collaboration is at the heart of innovation. We are proud to partner with industry leaders in technology and software who share our commitment to excellence. Together, we develop and utilize cutting-edge tools that empower artists and designers worldwide."
                    imageUrl="https://ipagevision.s3.ap-south-1.amazonaws.com/Our+Partners.jpeg"
                    imagePosition="left"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
                      <SubSection id="partners-edigital" title="Edigital">
                        Pioneering digital solutions that redefine the boundaries of creative expression.
                      </SubSection>
                    </div>
                  </Section>
                </div>
                <div id="contact">
                  <ContactCTA />
                </div>
                <Newsletter />
              </main>
            }
          />
        </Routes>
        <Footer links={NAV_LINKS} />
      </div>
    </Router>
  );
}

export default App;
