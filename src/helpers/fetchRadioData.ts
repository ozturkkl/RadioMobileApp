import {XMLParser} from 'fast-xml-parser';
import {radioOptions} from '../../radioOptions';
import {Episode, Podcast} from './types';

export async function fetchStreamInfo(selectedRadioIndex: number): Promise<{cover: string; artist: string; title: string}> {
  const trackInfoUrl = radioOptions?.radios?.[selectedRadioIndex]?.trackInfoUrl;
  const trackInfo = radioOptions?.radios?.[selectedRadioIndex]?.trackInfo;

  if (trackInfoUrl) {
    return (await (await fetch(trackInfoUrl)).json()) as {cover: string; artist: string; title: string};
  } else if (trackInfo) {
    return trackInfo;
  } else {
    return {cover: '', artist: '', title: ''};
  }
}

export const fetchPodcastsFromRssFeeds = async (feedUrls: string[]) => {
  const podcasts: Podcast[] = [];

  for (const url of feedUrls) {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new XMLParser();
    const channel = parser.parse(xmlText).rss.channel;

    const podcast: Podcast = {
      title: channel.title,
      imageUrl: channel.image.url,
      description: channel.description,
      id: channel['podcast:guid'],
      items: channel.item.map((item: any) => {
        const episode: Episode = {
          id: item.guid,
          title: item.title,
          url: item.link,
          duration: item['itunes:duration'],
        };
        return episode;
      }),
    };
    podcasts.push(podcast);
  }

  return podcasts;
};
