export interface Podcast {
  title: string;
  description: string;
  imageUrl: string;
  items: Episode[];
}

export interface Episode {
  title: string;
  url: string;
  duration: string;
}
