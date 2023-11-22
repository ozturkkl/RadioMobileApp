import {getPodcastsFromRSSFeed, radioOptions} from '../../radioOptions';
import {setData} from './storage';
// import uuid from 'react-native-uuid';

export const fetchStreamInfo = async (selectedRadioIndex: number): Promise<{cover: string; artist: string; title: string}> => {
  try {
    return (await fetch(radioOptions.radios[selectedRadioIndex].trackInfoUrl)).json();
  } catch (error) {
    console.error(error);
    return {cover: '', artist: '', title: ''};
  }
};

export const fetchPodcastsFromCustomUrl = async () => {
  const podcasts = await getPodcastsFromRSSFeed(radioOptions.podcastRSSFeed);
  setData('CACHED_PODCASTS', podcasts);
  return podcasts;
};
