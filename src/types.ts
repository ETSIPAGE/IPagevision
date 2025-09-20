
export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  gridClass: string;
}

export interface NavLinkCategory {
  title: string;
  links: { name: string; href: string }[];
}