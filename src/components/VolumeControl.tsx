import Slider from '@react-native-community/slider';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TrackPlayer, {Event, State, useTrackPlayerEvents} from 'react-native-track-player';
import colors from '../helpers/colors';
import {safeWindowX} from '../helpers/dimensions';
import {AppContext} from '../helpers/state';

export default function VolumeControl() {
  const {appState, setAppState} = useContext(AppContext);
  const [volumeIcon, setVolumeIcon] = useState('volume-2');
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (appState.volume) {
      TrackPlayer.setVolume(appState.volume);
      appState.volume === 0 ? setMuted(true) : setMuted(false);
      setVolumeIcon(appState.volume < 0.3 ? 'volume' : appState.volume < 0.7 ? 'volume-1' : 'volume-2');
    }
  }, [appState.volume]);

  useEffect(() => {
    muted ? TrackPlayer.setVolume(0) : TrackPlayer.setVolume(appState.volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted]);

  useTrackPlayerEvents([Event.PlaybackState], async event => {
    if (event.state === State.Playing) TrackPlayer.setVolume(appState.volume);
  });

  return (
    <View style={styles.volumeSliderWrapper}>
      <TouchableOpacity
        onPress={() => {
          setMuted((value: boolean) => {
            return !value;
          });
        }}>
        <Icon name={muted ? 'volume-x' : volumeIcon} style={styles.volumeIcon} />
      </TouchableOpacity>
      <Slider
        style={{width: safeWindowX * 0.75, height: safeWindowX * 0.15}}
        value={muted ? 0 : appState.volume}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        onValueChange={(val: number) => {
          setAppState({volume: val});
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  volumeSliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeIcon: {
    fontSize: safeWindowX * 0.07,
    color: colors.mainText,
  },
});
