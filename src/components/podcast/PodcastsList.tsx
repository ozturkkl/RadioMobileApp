import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {safeWindowX} from '../../helpers/dimensions';

import {fetchPodcastsFromCustomUrl} from '../../helpers/fetchRadioData';
import {navigationProps} from '../../helpers/navigationSettings';
import {Podcast} from '../../helpers/types';

import PodcastItem from './PodcastItem';

export default function PodcastsList({navigation}: navigationProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    fetchPodcastsFromCustomUrl(setPodcasts);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={podcasts} renderItem={(podcast: any) => <PodcastItem item={podcast.item} navigation={navigation} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginBottom: safeWindowX * 0.04,
  },
});
