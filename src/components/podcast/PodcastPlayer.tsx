import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';

import {safeWindowX, windowX} from '../../helpers/dimensions';
import colors from '../../helpers/colors';
import {currentPodcast} from '../../helpers/setupPlayer';

export default function PodcastPlayer() {
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.state === State.Playing && currentPodcast) setTrackPlaying(true);
    else setTrackPlaying(false);

    if (event.state === State.Connecting || event.state === State.Buffering || event.state === 'buffering') setLoading(true);
    else setLoading(false);
  });
  useEffect(() => {
    TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing && !!currentPodcast));
  }, []);
  async function handlePlay() {
    const state = await TrackPlayer.getState();

    if (state === State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
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
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={handleSkipBack} style={styles.buttonWrapper}>
        <Icon name="skip-back" style={styles.sideIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlay} style={styles.buttonWrapper}>
        <Icon name={loading ? 'loader' : trackPlaying ? 'pause' : 'play'} style={[styles.mainIcon, trackPlaying || loading ? {} : styles.playIcon]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSkipNext} style={styles.buttonWrapper}>
        <Icon name="skip-forward" style={styles.sideIcons} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
