export interface podcast {
  title: string;
  description: string;
  imageUrl: string;
  items: [episode];
}

export interface episode {
  title: string;
  url: string;
}
