import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';

import colors from '../../helpers/colors';
import {safeWindowX} from '../../helpers/dimensions';
import {Episode, Podcast} from '../../helpers/types';
import {currentPodcast, setupPodcast} from '../../helpers/setupPlayer';
import global from '../../helpers/global';

interface props {
  podcast: Podcast;
  episode: Episode;
  index: number;
  indexPlaying: number;
}

export default function EpisodeItem({episode, podcast, index, indexPlaying}: props) {
  async function handleClickPodcast() {
    if (index === (await TrackPlayer.getCurrentTrack()) && (await TrackPlayer.getState()) === State.Playing && currentPodcast === podcast) return;

    await setupPodcast({...podcast, items: [...podcast.items].reverse()}, podcast.items.length - index - 1);

    await TrackPlayer.play();

    global.setPodcastPlaying.episodes?.(true);
    global.setPodcastPlaying.podcasts?.(true);
  }

  return (
    <TouchableOpacity
      style={[styles.container, podcast.items.length - indexPlaying - 1 === index ? styles.playing : styles.container]}
      onPress={handleClickPodcast}>
      
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={[styles.title, styles.textShadow]}>
          {episode.title}
        </Text>
      </View>

      <View style={styles.durationContainer}>
        <Text numberOfLines={1} style={[styles.title, styles.textShadow, styles.duration]}>
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
    width: safeWindowX * 0.09,
    paddingHorizontal: safeWindowX * 0.001,
  },
  duration: {
    fontSize: safeWindowX * 0.035,
    width: 50
  },
  title: {
    color: colors.mainText,
    fontSize: safeWindowX * 0.05,
    marginBottom: safeWindowX * 0.004,
  },
  shadow: {
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textShadow: {
    textShadowColor: colors.shadowColor,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 20,
  },
});
