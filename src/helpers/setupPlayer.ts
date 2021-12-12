import TrackPlayer, {Capability} from 'react-native-track-player';
import radio from '../../radioOptions';
import {log} from './logger';
import {getData} from './storage';
import {podcast} from './types';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
  compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

  stopWithApp: true,
  alwaysPauseOnInterruption: true,
});

export const playRadio = async () => {
  await TrackPlayer.setupPlayer({waitForBuffer: true});
  await TrackPlayer.reset();
  await TrackPlayer.add([
    {
      title: '',
      artist: '',
      url: radio.RADIO_STREAM_URL,
    },
  ]);
};
export const playPodcast = async (podcastId: string) => {
  await TrackPlayer.setupPlayer({waitForBuffer: true});
  await TrackPlayer.reset();

  const podcast = <podcast>(
    JSON.parse((await getData('podcasts')) || '[]').filter(
      (podcast: podcast) => podcast.id === podcastId,
    )[0]
  );

  log(podcast);
  if (podcast.items)
    podcast.items.forEach(async item => {
      await TrackPlayer.add([
        {
          title: item.title,
          artist: podcast.title,
          url: item.url,
        },
      ]);
    });
};
