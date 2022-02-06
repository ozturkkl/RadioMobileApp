import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';

import colors from '../../helpers/colors';
import {safeWindowX} from '../../helpers/dimensions';
import {episode, podcast} from '../../helpers/types';
import {currentPodcast, setupPodcast} from '../../helpers/setupPlayer';

interface props {
  podcast: podcast;
  episode: episode;
  index: number;
  indexPlaying: number;
}

export default function EpisodeItem({episode, podcast, index, indexPlaying}: props) {
  async function handleClickPodcast() {
    if (index === (await TrackPlayer.getCurrentTrack()) && (await TrackPlayer.getState()) === State.Playing && currentPodcast === podcast) return;

    await setupPodcast(podcast, index);

    await TrackPlayer.play();
  }

  return (
    <TouchableOpacity style={[styles.container, indexPlaying === index ? styles.playing : styles.container]} onPress={handleClickPodcast}>
      <View style={[styles.logoContainer, styles.shadow]}>
        <Image source={{uri: podcast.imageUrl}} style={{width: '100%', height: '100%'}} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={[styles.title, styles.textShadow]}>
          {episode.title}
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
    marginVertical: safeWindowX * 0.02,
  },
  playing: {
    backgroundColor: '#ffffff66',
  },
  logoContainer: {
    width: safeWindowX * 0.2,
    height: safeWindowX * 0.2,
    borderRadius: safeWindowX * 0.16 * 0.2,
    overflow: 'hidden',
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: safeWindowX * 0.03,
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
