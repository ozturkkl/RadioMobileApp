import radioOptions from '../../radioOptions';
import rssParse from '../helpers/rssParse';
import {getData, setData} from './storage';
import {podcast} from './types';
import uuid from 'react-native-uuid';

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

export const fetchPodcastsFromCastos = async (setPodcasts: React.Dispatch<any>) => {
  const podcasts: object[] = [];

  const stored = JSON.parse((await getData('podcasts')) || '[]');
  const timePassed = Date.now() - Number(await getData('podcasts_updated'));
  setPodcasts(stored);

  // Return chached results if fetched in last 10 mins.
  if (timePassed < 60 * 1000 * 10 && timePassed > 0 && stored.length > 0) {
    return;
  }

  try {
    const list = (await (await fetch(`https://app.castos.com/api/v2/podcasts?token=${radioOptions.CASTOS_TOKEN}`)).json()).data.podcast_list;
    for (let item in list) {
      const podcast = (await (await fetch(`https://app.castos.com/api/v2/podcasts/${item}?token=${radioOptions.CASTOS_TOKEN}`)).json()).data;

      let {
        title,
        description,
        image: {url},
        items,
      } = await rssParse('https://' + podcast.rss_url);
      const items_obj = items.map(item => {
        return {
          title: item.title,
          url: item.enclosures[0].url,
        };
      });

      podcasts.push({
        id: item,
        title,
        description,
        imageUrl: url,
        items: items_obj,
      });
    }
  } catch (error) {
    console.error(
      'Error while trying to fetch podcast information from Castos, if you are not using Castos go to fetchRadioData.ts and update the code to fetch from your podcast resource. Error: ' +
        error,
    );
  }

  setData('podcasts', JSON.stringify(podcasts));
  setData('podcasts_updated', Date.now().toString());
  setPodcasts(podcasts);
};

export const fetchPodcastsFromCustomUrl = async (setPodcasts: React.Dispatch<any>) => {
  const podcasts: podcast[] = [];
  const rssData = await rssParse(radioOptions.PODCAST_RSS_FEED);
  rssData.items.forEach(item => {
    const podcast = podcasts.find(podcast => podcast.title === item.itunes.summary);
    if (podcast) {
      podcast.items.push({
        title: item.title,
        url: item.enclosures[0].url,
      });
    } else {
      podcasts.push({
        id: uuid.v4().toString(),
        title: item.itunes.summary || radioOptions.RADIO_NAME,
        description: item.description,
        imageUrl: item.itunes.image || radioOptions.RADIO_ICON,
        items: [
          {
            title: item.title,
            url: item.enclosures[0].url,
          },
        ],
      });
    }
  });
  setPodcasts(podcasts)
};
