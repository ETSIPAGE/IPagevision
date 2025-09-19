import { GalleryImage, NavLinkCategory } from './types';

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/gall1/800/600', title: 'Futuristic Metropolis', subtitle: 'Conceptual Design', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: 'https://picsum.photos/seed/gall2/600/800', title: 'Riverside Complex', subtitle: 'Urban Development', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 3, src: 'https://picsum.photos/seed/gall3/600/400', title: 'Symphony Hall', subtitle: 'Cultural Center', gridClass: 'md:col-span-1' },
  { id: 4, src: 'https://picsum.photos/seed/gall4/800/400', title: 'Coastal Residences', subtitle: 'Private Housing', gridClass: 'md:col-span-2' },
  { id: 5, src: 'https://picsum.photos/seed/gall5/400/600', title: 'Island Pathway', subtitle: 'Public Infrastructure', gridClass: 'md:col-span-1 md:row-span-2' },
  { id: 6, src: 'https://picsum.photos/seed/gall6/800/600', title: 'National Museum of Archeology', subtitle: 'Undisclosed Project', gridClass: 'md:col-span-2 md:row-span-2' },
  { id: 7, src: 'https://picsum.photos/seed/gall7/600/400', title: 'Hillside Villa', subtitle: 'Luxury Estate', gridClass: 'md:col-span-1' },
  { id: 8, src: 'https://picsum.photos/seed/gall8/600/800', title: 'Suspension Bridge', subtitle: 'Civil Engineering', gridClass: 'md:col-span-1 md:row-span-2' },
];

export const CLIENT_LOGOS: string[] = [
  'BIG', 'Gensler', 'nbbj', 'Google', 'LIMA', 'Zaha Hadid Architects', 'SOM', 'Snøhetta',
  'KKAA', 'UNStudio', 'HELEN & HARD', 'MVRDV', 'PERKINS + WILL', 'mad', 'OMA', 'nordic',
  'THE MILL', 'KPF', 'Foster + Partners', 'SQUINT / OPERA', 'POPULOUS', 'ΛLΛ', 'white', 'ZGF',
  'ASGG', 'HPA', 'morphosis', 'TWA', 'FACTORY FIFTEEN', 'David Chipperfield Architects', 'NEOM', 'WHOOSH'
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