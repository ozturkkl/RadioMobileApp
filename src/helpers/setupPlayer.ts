import TrackPlayer, {AppKilledPlaybackBehavior, Capability} from 'react-native-track-player';
import {Podcast} from './types';
import {radioOptions} from '../../radioOptions';

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

export let playingPodcastID: string | null;

export const setupRadio = async (selectedRadioIndex: number) => {
  playingPodcastID = null;
  await TrackPlayer.setRate(1);
  await TrackPlayer.reset();
  await TrackPlayer.add([
    {
      title: '',
      artist: '',
      url: radioOptions.radios[selectedRadioIndex].streamUrl,
    },
  ]);
};
export const stopRadio = async () => {
  playingPodcastID = null;
  await TrackPlayer.reset();
};
export const setupPodcast = async (podcast: Podcast, index?: number) => {
  if (playingPodcastID !== podcast.id) {
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

  playingPodcastID = podcast.id;

  if (index !== undefined) {
    await TrackPlayer.getQueue();
    await TrackPlayer.skip(index);
  }
};
