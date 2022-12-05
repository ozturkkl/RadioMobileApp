import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import TrackPlayer, {State, Event, useTrackPlayerEvents, useProgress} from 'react-native-track-player';

import {safeWindowX, windowX} from '../../helpers/dimensions';
import colors from '../../helpers/colors';
import {currentPodcast} from '../../helpers/setupPlayer';

export const SEEK_TIME = 15;

export default function PodcastPlayer() {
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const {position, duration} = useProgress();


  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.state === State.Playing && currentPodcast) await setTrackPlaying(true);
    else await setTrackPlaying(false);

    if (event.state === State.Connecting || event.state === State.Buffering) await setLoading(true);
    else await setLoading(false);
  });
  useEffect(() => {
    TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing && !!currentPodcast));
  }, []);
  async function handlePlay() {
    const state = await TrackPlayer.getState();

    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
  async function handleSkipBack() {
    if ((await TrackPlayer.getCurrentTrack()) === 0) return;
    await TrackPlayer.skipToPrevious();
  }
  async function handleSkipNext() {
    if ((await TrackPlayer.getCurrentTrack()) >= (await (await TrackPlayer.getQueue()).length) - 1) return;
    await TrackPlayer.skipToNext();
  }
  async function handleSeekBackward() {
    await TrackPlayer.seekTo(position - SEEK_TIME);
  }
  async function handleSeekForward() {
    await TrackPlayer.seekTo(position + SEEK_TIME);
  }
  async function handleSeek(value: number) {
    await TrackPlayer.seekTo(value);
  }
  return (
    <>
      <View style={styles.seekbarContainer}>
        <Text style={styles.position}>
          {(position / 60 > 1 ? `${parseInt((position / 60).toString())}:` : '') + `${parseInt((position % 60).toString())}`}
        </Text>
        <Slider
          style={{width: safeWindowX * 0.75, height: safeWindowX * 0.15}}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={val => handleSeek(val)}
        />
        <Text style={styles.duration}>
          {(duration / 60 > 1 ? `${parseInt((duration / 60).toString())}:` : '') + `${parseInt((duration % 60).toString())}`}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSeekBackward} style={styles.buttonWrapper}>
          <Text style={[styles.skipNumber, styles.skipNumberLeft]}>{SEEK_TIME}</Text>
          <Icon name="rotate-ccw" style={[styles.sideIcons, styles.skipIcons]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipBack} style={styles.buttonWrapper}>
          <Icon name="skip-back" style={styles.sideIcons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlay} style={styles.buttonWrapper}>
          <Icon
            name={loading ? 'loader' : trackPlaying ? 'pause' : 'play'}
            style={[styles.mainIcon, trackPlaying || loading ? {} : styles.playIcon]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkipNext} style={styles.buttonWrapper}>
          <Icon name="skip-forward" style={styles.sideIcons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSeekForward} style={styles.buttonWrapper}>
          <Text style={[styles.skipNumber, styles.skipNumberRight]}>{SEEK_TIME}</Text>
          <Icon name="rotate-cw" style={[styles.sideIcons, styles.skipIcons]} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  seekbarContainer: {
    flexDirection: 'row',
    width: windowX,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.playButtonBackground,
  },
  position: {
    color: colors.mainText,
  },
  duration: {
    color: colors.mainText,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: windowX,
    justifyContent: 'center',
    backgroundColor: colors.playButtonBackground,
    height: '13%',
  },
  buttonWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    fontSize: safeWindowX * 0.1,
    backgroundColor: colors.linksBackground,
    padding: safeWindowX * 0.036,
    paddingLeft: safeWindowX * (0.036 + 0.001),
    paddingRight: safeWindowX * (0.036 - 0.001),
    borderRadius: safeWindowX * 0.085,
    overflow: 'hidden',
    marginHorizontal: safeWindowX * 0.03,
    color: colors.mainText,
  },
  playIcon: {
    paddingLeft: safeWindowX * (0.036 + 0.01),
    paddingRight: safeWindowX * (0.036 - 0.01),
  },
  sideIcons: {
    fontSize: safeWindowX * 0.07,
    paddingHorizontal: safeWindowX * 0.05,
    color: colors.mainText,
  },
  skipIcons: {
    fontSize: safeWindowX * 0.05,
  },
  skipNumber: {
    fontSize: safeWindowX * 0.035,
    color: colors.mainText,
    position: 'absolute',
  },
  skipNumberLeft: {
    right: safeWindowX * 0.12,
  },
  skipNumberRight: {
    left: safeWindowX * 0.12,
  },
});
