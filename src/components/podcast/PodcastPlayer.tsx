import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import TrackPlayer, {State, Event, useTrackPlayerEvents, useProgress} from 'react-native-track-player';

import {safeWindowX, windowX} from '../../helpers/dimensions';
import colors from '../../helpers/colors';
import {currentPodcast} from '../../helpers/setupPlayer';
import {getData, setData} from '../../helpers/storage';

export const SEEK_TIME = 15;

export default function PodcastPlayer() {
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const {position, duration} = useProgress();
  const [playRate, setPlayRate] = useState(1);

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
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    const trackCount = (await (await TrackPlayer.getQueue()).length) - 1;
    if (currentTrackIndex && currentTrackIndex >= trackCount) {
      return;
    }
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
  async function handleSpeed(reset = false) {
    if (!(await getData('playRateToastShown'))) {
      ToastAndroid.showWithGravity('Normal hız için basılı tutunuz', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      await setData('playRateToastShown', 'true');
    }

    let rate = await TrackPlayer.getRate();
    rate + 0.25 > 3 ? (rate = 1) : (rate += 0.25);
    if (reset) rate = 1;
    await TrackPlayer.setRate(rate);
    setPlayRate(rate);
  }
  function toHHMMSS(duration: string) {
    const totalSeconds = parseInt(duration, 10);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;
    const time =
      hours > 0
        ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return time;
  }
  return (
    <>
      <View style={styles.seekbarContainer}>
        <Text style={styles.mainText}>{toHHMMSS(position.toString())}</Text>
        <Slider
          style={styles.seekbar}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={val => handleSeek(val)}
        />
        <Text style={styles.mainText}>{toHHMMSS(duration.toString())}</Text>
        <TouchableOpacity onPress={() => handleSpeed()} onLongPress={() => handleSpeed(true)} style={styles.speedButton}>
          <Icon name="zap" style={styles.mainText} />
          <Text style={styles.mainText}>{playRate}x</Text>
        </TouchableOpacity>
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
  mainText: {
    color: colors.mainText,
  },
  seekbarContainer: {
    flexDirection: 'row',
    width: windowX,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.playButtonBackground,
    paddingHorizontal: safeWindowX * 0.08,
  },
  seekbar: {
    width: 0,
    height: safeWindowX * 0.15,
    flex: 1,
  },
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: safeWindowX * 0.02,
    width: safeWindowX * 0.18,
    height: '100%',
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
