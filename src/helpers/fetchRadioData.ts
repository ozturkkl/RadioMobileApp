import {getPodcastsFromRSSFeed, radioOptions} from '../../radioOptions';
import {setData} from './storage';
// import uuid from 'react-native-uuid';

export const fetchStreamInfo = async (setAlbumCover: React.Dispatch<any>, setTrackArtist: React.Dispatch<any>, setTrackName: React.Dispatch<any>) => {
  try {
    let res = await (await fetch(radioOptions.RADIO_STREAM_TRACK_INFO_URL)).json();
    setAlbumCover(res.cover);
    setTrackArtist(res.artist);
    setTrackName(res.title);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPodcastsFromCustomUrl = async () => {
  const podcasts = await getPodcastsFromRSSFeed(radioOptions.PODCAST_RSS_FEED);
  setData('CACHED_PODCASTS', podcasts);
  return podcasts;
};
