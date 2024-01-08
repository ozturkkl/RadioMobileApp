import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';

import colors from '../../helpers/colors';
import {safeWindowX} from '../../helpers/dimensions';
import {Episode, Podcast} from '../../helpers/types';
import {playingPodcastID, setupPodcast} from '../../helpers/setupPlayer';
import {AppContext} from '../../helpers/state';
import {globalStyles} from '../../helpers/styles';

interface props {
  podcast: Podcast;
  episode: Episode;
  index: number;
  indexPlaying: number;
}

export default function EpisodeItem({episode, podcast, index, indexPlaying}: props) {
  const {setAppState} = useContext(AppContext);
  async function handleClickPodcast() {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    const state = await TrackPlayer.getState();
    // return if user clicks on the same episode
    if (
      currentTrackIndex !== null &&
      index + currentTrackIndex === podcast.items.length - 1 &&
      state === State.Playing &&
      playingPodcastID === podcast.id
    )
      return;

    await setupPodcast({...podcast, items: [...podcast.items].reverse()}, podcast.items.length - index - 1);

    await TrackPlayer.play();

    setAppState(state => {
      return {
        ...state,
        showPodcastPlayerControls: true,
      };
    });
  }

  return (
    <TouchableOpacity
      style={[styles.container, podcast.items.length - indexPlaying - 1 === index ? styles.playing : styles.container]}
      onPress={handleClickPodcast}>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={[styles.title, globalStyles.textShadow]}>
          {episode.title}
        </Text>
      </View>

      <View style={styles.durationContainer}>
        <Text numberOfLines={1} style={[styles.title, globalStyles.textShadow, styles.duration]}>
          {episode.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linksBackground,
    borderRadius: safeWindowX * 0.16 * 0.2,
    marginHorizontal: safeWindowX * 0.02,
    marginVertical: safeWindowX * 0.01,
    padding: 16,
  },
  playing: {
    backgroundColor: '#ffffff66',
  },
  logoContainer: {
    width: safeWindowX * 0.15,
    height: safeWindowX * 0.15,
    borderRadius: safeWindowX * 0.16 * 0.2,
    overflow: 'hidden',
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: safeWindowX * 0.001,
  },
  durationContainer: {
    width: safeWindowX * 0.142,
    paddingHorizontal: safeWindowX * 0.001,
  },
  duration: {
    fontSize: safeWindowX * 0.035,
    textAlign: 'right',
  },
  title: {
    color: colors.mainText,
    fontSize: safeWindowX * 0.05,
    marginBottom: safeWindowX * 0.004,
  },
});
