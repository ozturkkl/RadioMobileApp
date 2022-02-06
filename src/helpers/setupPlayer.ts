import TrackPlayer, {Capability} from 'react-native-track-player';
import radio from '../../radioOptions';
import {podcast} from './types';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
  compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],

  stopWithApp: true,
  alwaysPauseOnInterruption: true,
});

export let currentPodcast: podcast | null = null;

export const setupRadio = async () => {
  currentPodcast = null;
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
export const setupPodcast = async (podcast: podcast, index?: number) => {
  if (currentPodcast !== podcast) {
    await TrackPlayer.setupPlayer({waitForBuffer: true});
    await TrackPlayer.reset();

    if (podcast.items) {
      podcast.items.forEach(async item => {
        await TrackPlayer.add([
          {
            title: item.title,
            artist: podcast.title,
            url: item.url,
          },
        ]);
      });
    }
  }

  currentPodcast = podcast;

  if (index !== undefined) {
    await TrackPlayer.getQueue();
    await TrackPlayer.skip(index);
  }
};
