import TrackPlayer, {Event, State} from 'react-native-track-player';
import {SEEK_TIME} from '../components/podcast/PodcastPlayer';

let playerPausedByDuck = false;

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener(Event.RemoteJumpBackward, () => {
    TrackPlayer.getPosition().then(position => {
      TrackPlayer.seekTo(position - SEEK_TIME);
    });
  });
  TrackPlayer.addEventListener(Event.RemoteJumpForward, () => {
    TrackPlayer.getPosition().then(position => {
      TrackPlayer.seekTo(position + SEEK_TIME);
    });
  });
  TrackPlayer.addEventListener(Event.RemoteDuck, e => {
    if (e.paused === true && e.permanent === true) {
      TrackPlayer.reset();
    }
    if (e.paused === true && e.permanent === false) {
      TrackPlayer.getState().then(state => {
        if (state === State.Playing) {
          playerPausedByDuck = true;
        }
        TrackPlayer.pause();
      });
    }
    if (e.paused === false && e.permanent === false && playerPausedByDuck) {
      TrackPlayer.play();
      playerPausedByDuck = false;
    }
  });
};
