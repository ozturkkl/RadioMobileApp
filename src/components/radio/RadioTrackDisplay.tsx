import React, {useContext, useEffect, useState} from 'react';
import {Easing, Image, StyleSheet, Text, View} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import colors from '../../helpers/colors';
import LinksBar from '../LinksBar';
import {safeWindowX} from '../../helpers/dimensions';
import {fetchStreamInfo} from '../../helpers/fetchRadioData';
import {radioOptions} from '../../../radioOptions';
import {AppContext} from '../../helpers/state';

export default function RadioTrackDisplay() {
  const [albumCover, setAlbumCover] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [trackName, setTrackName] = useState('');
  const {appState} = useContext(AppContext);
  useEffect(() => {
    // Runs immediately and then every 5 seconds with the return function and invoke itself trick.
    const destroy = setInterval(
      (function runFetchInfo() {
        fetchStreamInfo(appState.selectedRadioIndex).then(radioInfo => {
          setAlbumCover(radioInfo.cover);
          setTrackArtist(radioInfo.artist);
          setTrackName(radioInfo.title);
        });
        return runFetchInfo;
      })(),
      5000,
    );
    return () => {
      clearInterval(destroy);
    };
  }, [appState.selectedRadioIndex]);
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <Image
          style={styles.albumCover}
          defaultSource={radioOptions.radios[appState.selectedRadioIndex].image}
          source={!albumCover ? radioOptions.radios[appState.selectedRadioIndex].image : {uri: albumCover}}
        />
      </View>
      <LinksBar />
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.trackArtist, styles.textShadow]}>
        {!trackArtist ? radioOptions.radios[appState.selectedRadioIndex].image.title : trackArtist}
      </Text>
      <TextTicker
        easing={Easing.linear}
        bounceSpeed={150}
        bouncePadding={{left: 10, right: 10}}
        bounceDelay={3000}
        marqueeDelay={1000}
        repeatSpacer={50}
        scrollSpeed={50}
        style={[styles.trackName, styles.textShadow]}>
        {trackName}
      </TextTicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumCover: {
    width: safeWindowX * 0.57,
    height: safeWindowX * 0.57,
    borderRadius: 10,
    borderColor: colors.albumCoverBorder,
    borderWidth: 3,
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
    borderRadius: 10,
  },
  textShadow: {
    textShadowColor: colors.shadowColor,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
  trackArtist: {
    marginTop: safeWindowX * 0.035,
    fontSize: safeWindowX * 0.04,
    color: colors.mainText,
  },
  trackName: {
    marginTop: safeWindowX * 0.012,
    fontSize: safeWindowX * 0.055,
    fontWeight: '500',
    color: colors.mainText,
  },
});
