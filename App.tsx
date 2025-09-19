import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Clients from './components/Clients';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Section from './components/Section';
import ContactCTA from './components/ContactCTA';
import Loader from './components/Loader';
import { GALLERY_IMAGES, CLIENT_LOGOS, NAV_LINKS } from './constants';

const SubSection: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <div id={id}>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a delay to ensure the animation is visible
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={`bg-black text-white font-sans antialiased transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <Hero
            imageUrl="https://picsum.photos/seed/hero/1920/1080"
            superTitle="Architectural Visualization"
            title="We bring your vision to life"
            actionText="Watch our showreel"
          />
          <div id="about-us">
            <Section
              title="Who We Are"
              text="IPage Vision is a high-end architectural visualization studio. We are a creative team of architectural designers, 3D artists, and storytellers who are passionate about creating compelling visual narratives. We collaborate with architects, developers, and designers to translate their visions into stunning, photorealistic images and films."
            />
          </div>
          <div id="our-team">
              <Section
                  title="Our Team"
                  text="Our strength lies in our diversity. We are a collective of architects, interior designers, civil engineers, artists, filmmakers and tech enthusiasts, united by a shared passion for visual storytelling. This multidisciplinary approach allows us to tackle complex challenges with a unique perspective, pushing the boundaries of what's possible in digital representation."
                  imageUrl="https://picsum.photos/seed/team/800/1000"
                  imagePosition="right"
              />
          </div>
          <Section
            title="Our Projects"
            text="Every project is a unique journey. We dive deep into the essence of the design, working closely with our clients to understand their vision. From initial concept to final render, our process is built on collaboration, precision, and a relentless pursuit of artistic excellence. The result is not just a visualization, but a story that resonates and inspires."
          />
          <div id="works">
            <Gallery images={GALLERY_IMAGES} />
          </div>
          <div id="expertise-architecture">
            <Section
              title="Our Expertise"
              text="We operate at the intersection of art and technology, offering a suite of visualization services tailored to diverse industries. Our expertise ensures that every project, regardless of its scale or complexity, is communicated with clarity, impact, and artistic integrity."
              imageUrl="https://picsum.photos/seed/expertise/800/1000"
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
          <div id="newsroom">
              <Section
                  title="Newsroom"
                  text="Stay connected with the latest from IPage Vision. Here, we share our most recent projects, awards, and contributions to the design community. We are proud to be part of the global conversation, shaping the future of architectural and digital design communication."
                  imageUrl="https://picsum.photos/seed/news/800/1000"
                  imagePosition="right"
              />
          </div>
          <div id="clients">
            <Clients logos={CLIENT_LOGOS} />
          </div>
          <div id="career-positions">
             <Section
              title="Join Our Team"
              text="We are always looking for passionate and talented individuals to join our growing team. If you are driven by creativity, innovation, and a desire to create exceptional work, we would love to hear from you. Explore our open positions and discover a community where you can thrive."
              imageUrl="https://picsum.photos/seed/career/800/1000"
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
                  imageUrl="https://picsum.photos/seed/academy/800/1000"
                  imagePosition="right"
              />
          </div>
          <div id="partners-pulze">
             <Section
              title="Our Partners"
              text="Collaboration is at the heart of innovation. We are proud to partner with industry leaders in technology and software who share our commitment to excellence. Together, we develop and utilize cutting-edge tools that empower artists and designers worldwide."
              imageUrl="https://picsum.photos/seed/partners/800/1000"
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
        <Footer links={NAV_LINKS} />
      </div>
    </>
  );
};

export default App;