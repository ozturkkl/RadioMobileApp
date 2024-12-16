import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {safeWindowX} from '../../helpers/dimensions';

import {navigationProps} from '../../helpers/navigationSettings';
import {Podcast} from '../../helpers/types';

import PodcastItem from './PodcastItem';
import {AppContext} from '../../helpers/state';

export default function PodcastsList({navigation}: navigationProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const {appState} = useContext(AppContext);

  useEffect(() => {
    if (appState.cachedPodcasts.length > 0) {
      setPodcasts(appState.cachedPodcasts);
    }
  }, [appState.cachedPodcasts]);

  return (
    <View style={styles.container}>
      <FlatList data={podcasts} renderItem={renderItemInfo => <PodcastItem item={renderItemInfo.item} navigation={navigation} />} />
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
