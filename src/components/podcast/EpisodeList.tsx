import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player';
import {safeWindowX} from '../../helpers/dimensions';

import {playingPodcastID} from '../../helpers/setupPlayer';
import {Podcast} from '../../helpers/types';

import EpisodeItem from './EpisodeItem';

interface prop {
  podcast: Podcast;
}

export default function EpisodeList({podcast}: prop) {
  const [indexPlaying, setIndexPlaying] = useState(-1);

  const podcastActive = useCallback(() => {
    return playingPodcastID === podcast.id;
  }, [podcast]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (podcastActive()) setIndexPlaying(event.nextTrack);
  });

  useEffect(() => {
    if (podcastActive()) {
      TrackPlayer.getCurrentTrack().then(track => {
        if (track) setIndexPlaying(track);
      });
    }
  }, [podcastActive]);

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
