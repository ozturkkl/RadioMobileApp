import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';

import {safeWindowX, windowX} from '../../helpers/dimensions';
import colors from '../../helpers/colors';
import {playingPodcastID, setupRadio, stopRadio} from '../../helpers/setupPlayer';
import {AppContext} from '../../helpers/state';

export default function RadioPlayer() {
  const [trackPlaying, setTrackPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const {appState} = useContext(AppContext);
  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.state === State.Playing && playingPodcastID === null) setTrackPlaying(true);
    else setTrackPlaying(false);

    if (event.state === State.Connecting || event.state === State.Buffering) setLoading(true);
    else setLoading(false);
  });
  useEffect(() => {
    TrackPlayer.getState().then(state => setTrackPlaying(state === State.Playing && playingPodcastID === null));
  }, []);
  async function handlePlay() {
    const state = await TrackPlayer.getState();

    if ((state !== State.Playing && state !== State.Paused) || playingPodcastID !== null) {
      await setupRadio(appState.selectedRadioIndex);
      await TrackPlayer.play();
      return;
    }

    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else if (state === State.Paused) {
      await TrackPlayer.play();
    }
  }
  async function handleStop() {
    return stopRadio();
  }
  async function handleReset() {
    await handleStop();
    await handlePlay();
  }
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={handleStop} style={styles.buttonWrapper}>
        <Icon name="square" style={styles.sideIcons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlay} style={styles.buttonWrapper}>
        <Icon name={loading ? 'loader' : trackPlaying ? 'pause' : 'play'} style={[styles.mainIcon, trackPlaying || loading ? {} : styles.playIcon]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.buttonWrapper}>
        <Icon name="rotate-ccw" style={styles.sideIcons} />
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
