import { GalleryImage, NavLinkCategory } from './types';

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: '/images/2D.png', title: 'BTO - Tengah', subtitle: 'Living', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/images/1D.png', title: 'BTO - Tengah', subtitle: 'Foyer ', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 3, src: '/images/8.png', title: 'HDB Maisonette', subtitle: 'Living', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 4, src: '/images/12.png', title: 'HDB Maisonette', subtitle: 'Master Bedroom ', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 6, src: '/images/Guest Bedroom (Bungalow).png', title: 'HDB Masionette', subtitle: 'Guest Bedroom', gridClass: 'md:col-span-2' },
  { id: 7, src: '/images/Bathroom (HDB M).png', title: 'HDB Masionette', subtitle: 'Bathroom', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 8, src: '/images/Kitchen (HDB M).png', title: 'HDB Masionette', subtitle: 'Kitchen ', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 9, src: '/images/1.png', title: 'Bungalow', subtitle: 'Living', gridClass: 'md:col-span-1' },
  { id: 10, src: '/images/gd.png', title: 'Bungalow', subtitle: 'Master Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 11, src: '/images/Bedroom (Bungalow).png', title: 'Bungalow', subtitle: 'Guest Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 12, src: '/images/Dining (Bungalow).png', title: 'Bungalow', subtitle: 'Dining Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
];

// ✅ Converted to objects so you can handle sizes dynamically
export const CLIENT_LOGOS: { src: string; size?: string }[] = [
  { src: '/images/c1.png' }, { src: '/images/c2.png' }, { src: '/images/c3.png' }, { src: '/images/c4.png' },
  { src: '/images/c5.png' }, { src: '/images/c6.png' }, { src: '/images/c7.png' }, { src: '/images/c8.png' },
  { src: '/images/c9.png' }, { src: '/images/c10.png' }, { src: '/images/c11.png' }, { src: '/images/c12.png' },
  { src: '/images/c13.png' }, { src: '/images/c15.png' }, { src: '/images/c16.png' }, { src: '/images/c17.png' },
  { src: '/images/c18.png' }, { src: '/images/c19.png' }, { src: '/images/c20.png' }, { src: '/images/c21.png' },
  { src: '/images/c22.png' }, { src: '/images/c23.png' },
  { src: '/images/c24.png', size: 'h-20' }, // 👈 increased size for this logo
  { src: '/images/c25.png' }, { src: '/images/c26.png' }, { src: '/images/c27.png' },
  { src: '/images/c28.png' }, { src: '/images/c29.png' }, { src: '/images/c30.png' },
  { src: '/images/c32.png' }, { src: '/images/c33.png' }, { src: '/images/c34.png' }
];

export const NAV_LINKS: NavLinkCategory[] = [
  {
    title: 'About',
    links: [
      { name: 'About us', href: '#about-us' },
      { name: 'Projects', href: '#works' },
      { name: 'Services', href: '#services' },
      { name: 'Workflow', href: '#workflow' },
      { name: 'Clients', href: '#clients' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Architecture', href: '#expertise-architecture-sub' },
      { name: 'Interior Visualisation', href: '#expertise-interior' },
      { name: '3D Modelling', href: '#expertise-3d-modelling' },
      { name: 'VR/AR Walkthrough', href: '#expertise-vr-ar' },
      { name: 'Construction Monitoring', href: '#expertise-construction' },
      { name: 'Real Estate', href: '#expertise-real-estate' },
    ]
  }
];
