import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../helpers/colors';
import {safeWindowX} from '../../helpers/dimensions';
import {podcast} from '../../helpers/types';
import {setupPodcast} from '../../helpers/setupPlayer';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';

export default function Podcast({item}: {item: podcast}) {
  async function handleClickPodcast() {
    await setupPodcast(item);
    TrackPlayer.play();
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleClickPodcast}>
      <View style={[styles.logoContainer, styles.shadow]}>
        <Image source={{uri: item.imageUrl}} style={{width: '100%', height: '100%'}} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text numberOfLines={1} style={[styles.title, styles.textShadow]}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={[styles.description, styles.textShadow]}>
          {item.description}
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
  description: {
    color: colors.mainText,
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
