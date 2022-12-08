import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player';
import {safeWindowX} from '../../helpers/dimensions';

import {currentPodcast} from '../../helpers/setupPlayer';
import {Podcast} from '../../helpers/types';

import EpisodeItem from './EpisodeItem';

interface prop {
  podcast: Podcast;
}

export default function EpisodeList({podcast}: prop) {
  const [indexPlaying, setIndexPlaying] = useState(-1);

  function podcastActive() {
    return currentPodcast?.title === podcast.title && currentPodcast.description === podcast.description;
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (podcastActive()) setIndexPlaying(event.nextTrack);
  });

  useEffect(() => {
    if (podcastActive()) {
      TrackPlayer.getCurrentTrack().then(track => {
        setIndexPlaying(track);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {
        <FlatList
          data={podcast.items}
          renderItem={({item, index}) => <EpisodeItem episode={{item}.item} index={{index}.index} podcast={podcast} indexPlaying={indexPlaying} />}
        />
      }
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
