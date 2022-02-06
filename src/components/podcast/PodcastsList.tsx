import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {fetchPodcastsFromCustomUrl} from '../../helpers/fetchRadioData';
import {navigationProps} from '../../helpers/navigationSettings';
import {podcast} from '../../helpers/types';

import PodcastItem from './PodcastItem';

export default function PodcastsList({navigation}: navigationProps) {
  const [podcasts, setPodcasts] = useState<podcast[]>([]);

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
  },
});
