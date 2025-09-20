import { GalleryImage, NavLinkCategory } from './types';

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: '/images/8.png', title: 'HDB Maisonette', subtitle: 'Living', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/images/9.png', title: 'HDB Maisonette', subtitle: 'Foyer ', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 3, src: '/images/12.png', title: 'HDB Masionette', subtitle: 'Master Bedroom', gridClass: 'md:col-span-1' },
  { id: 4, src: '/images/Guest Bedroom (Bungalow).png', title: 'HDB Masionette', subtitle: 'Guest Bedroom', gridClass: 'md:col-span-2' },
  { id: 5, src: '/images/Kitchen (HDB M).png', title: 'HDB Masionette', subtitle: 'Kitchen', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 6, src: '/images/Bathroom (HDB M).png', title: 'HDB Masionette', subtitle: 'Bathroom ', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 7, src: '/images/1.png', title: 'Bungalow', subtitle: 'Living', gridClass: 'md:col-span-1' },
  { id: 8, src: '/images/gd.png', title: 'Bungalow', subtitle: 'Master Bedroom', gridClass: 'md:col-span-1 md:row-span-2' },
];

export const CLIENT_LOGOS: string[] = [
  '/images/c1.png', '/images/c2.png', '/images/c3.png', '/images/c4.png', '/images/c5.png', '/images/c6.png', '/images/c7.png', '/images/c8.png',
  '/images/c9.png', '/images/c10.png', '/images/c11.png', '/images/c12.png', '/images/c13.png', '/images/c14.png', '/images/c15.png', '/images/c16.png',
  '/images/c17.png', '/images/c18.png', '/images/c19.png', '/images/c20.png', '/images/c21.png', '/images/c22.png', '/images/c23.png', '/images/c24.png','/images/c25.png'
  ,'/images/c26.png','/images/c27.png','/images/c28.png','/images/c29.png','/images/c30.png','/images/c31.png','/images/c32.png'
  ,'/images/c33.png','/images/c34.png','/images/c35.png'
];

export const NAV_LINKS: NavLinkCategory[] = [
  {
    title: 'About',
    links: [
      { name: 'About us', href: '#about-us' },
      { name: 'Our Team', href: '#our-team' },
      { name: 'Works', href: '#works' },
      { name: 'Newsroom', href: '#newsroom' },
      { name: 'Clients', href: '#clients' },
  { name: 'Contact', href: '#contact' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    ]
  },
  {
    title: 'Our Expertise',
    links: [
      { name: 'Architecture', href: '#expertise-architecture-sub' },
      { name: 'Interior Visualisation', href: '#expertise-interior' },
      { name: '3D Modelling', href: '#expertise-3d-modelling' },
      { name: 'VR/AR Walkthrough', href: '#expertise-vr-ar' },
      { name: 'Construction Monitoring', href: '#expertise-construction' },
      { name: 'Real Estate', href: '#expertise-real-estate' },
    ]
  },
  {
    title: 'Career',
    links: [
      { name: 'Positions', href: '#career-positions' },
      { name: 'Community', href: '#career-community' },
      { name: 'Useful articles', href: '#career-articles' },
      { name: 'Academy', href: '#academy' },
    ]
  },
  {
    title: 'Partners',
    links: [
      { name: 'Academy', href: '#academy' },
      { name: 'Pulze', href: '#partners-pulze' },
      { name: 'Edigital', href: '#partners-edigital' },
    ]
  }
];