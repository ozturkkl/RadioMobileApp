export interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  items: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  url: string;
  duration: string;
}

export interface AppState {
  selectedRadioIndex: number;
  showPodcastPlayerControls: true | false;
}
