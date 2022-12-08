import TrackPlayer, {AppKilledPlaybackBehavior, Capability} from 'react-native-track-player';
import radio from '../../radioOptions';
import {Podcast} from './types';

export async function initializePlayer() {
  await TrackPlayer.setupPlayer({waitForBuffer: true});

  TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.JumpForward,
      Capability.JumpBackward,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.JumpForward,
      Capability.JumpBackward,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    alwaysPauseOnInterruption: true,
  });
}

export let currentPodcast: Podcast | null = null;

export const setupRadio = async () => {
  currentPodcast = null;
  await TrackPlayer.reset();
  await TrackPlayer.add([
    {
      title: '',
      artist: '',
      url: radio.RADIO_STREAM_URL,
    },
  ]);
};
export const stopRadio = async () => {
  currentPodcast = null;
  await TrackPlayer.reset();
};
export const setupPodcast = async (podcast: Podcast, index?: number) => {
  if (currentPodcast !== podcast) {
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
