import { GalleryImage, NavLinkCategory } from './types';

export const GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/2D.jpeg', title: 'BTO - Tengah', subtitle: 'Living', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/1D.jpeg', title: 'BTO - Tengah', subtitle: 'Foyer ', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 3, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/8.jpeg', title: 'HDB Maisonette', subtitle: 'Living', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 4, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/12.jpeg', title: 'HDB Maisonette', subtitle: 'Master Bedroom ', gridClass: 'md:col-span-1 md:row-span-2' },

  { id: 6, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Guest+Bedroom+(Bungalow).jpeg', title: 'HDB Masionette', subtitle: 'Guest Bedroom', gridClass: 'md:col-span-2' },
  { id: 7, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Bathroom+(HDB+M).jpeg', title: 'HDB Masionette', subtitle: 'Kitchen', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 8, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Kitchen+(HDB+M).jpeg', title: 'HDB Masionette', subtitle: 'Bathroom ', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 9, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/1.jpeg', title: 'Bungalow', subtitle: 'Living', gridClass: 'md:col-span-1' },
  { id: 10, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/gd.jpeg', title: 'Bungalow', subtitle: 'Master Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 11, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Bedroom+(Bungalow).jpeg', title: 'Bungalow', subtitle: 'Guest Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 12, src: 'https://ipagevision.s3.ap-south-1.amazonaws.com/Dining+(Bungalow).jpeg', title: 'Bungalow', subtitle: 'Dining Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
];

export const CLIENT_LOGOS: string[] = [
  '/images/c1.png', '/images/c2.png', '/images/c3.png', '/images/c4.png', '/images/c5.png', '/images/c6.png', '/images/c7.png', '/images/c8.png',
  '/images/c9.png', '/images/c10.png', '/images/c11.png', '/images/c12.png', '/images/c13.png', '/images/c15.png', '/images/c16.png',
  '/images/c17.png', '/images/c18.png', '/images/c19.png', '/images/c20.png', '/images/c21.png', '/images/c22.png', '/images/c23.png', '/images/c24.png','/images/c25.png'
  ,'/images/c26.png','/images/c27.png','/images/c28.png','/images/c29.png','/images/c30.png','/images/c32.png'
  ,'/images/c33.png','/images/c34.png','/images/c35.png'
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