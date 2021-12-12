export interface podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  items: [
    {
      title: string;
      url: string;
    },
  ];
}
