import React from 'react';

interface SubSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const SubSection: React.FC<SubSectionProps> = ({ id, title, children }) => (
  <section id={id} className="mb-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div>{children}</div>
  </section>
);

export default SubSection;
