import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {navigationProps} from '../helpers/navigationSettings';
import colors from '../helpers/colors';
import {safeWindowX} from '../helpers/dimensions';
import {radioOptions} from '../../radioOptions';
import {AppContext} from '../helpers/state';
import {setupRadio} from '../helpers/setupPlayer';
import TrackPlayer, {State} from 'react-native-track-player';

interface props extends navigationProps {
  type: string;
}

export default function TopNav({navigation, type}: props) {
  const {appState, setAppState} = useContext(AppContext);
  const changeStations = () => {
    setAppState(state => {
      const newRadioIndex = (state.selectedRadioIndex + 1) % radioOptions.radios.length;
      TrackPlayer.getState().then(async state => {
        await setupRadio(newRadioIndex);
        if (state === State.Playing) TrackPlayer.play();
      });
      return {...appState, selectedRadioIndex: newRadioIndex};
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.logoContainer, styles.shadow]}
        onPress={() => {
          if (type === 'Home') {
            changeStations();
            return;
          }
          navigation.navigate('Home');
        }}>
        <Image source={radioOptions.radios[appState.selectedRadioIndex].image} style={{width: '100%', height: '100%'}} />
      </TouchableOpacity>

      <Text style={[styles.header, styles.textShadow]}>
        {type === 'Podcasts' || type === 'Episodes' ? 'Podcasts' : radioOptions.radios[appState.selectedRadioIndex].title}
      </Text>

      <TouchableOpacity
        style={styles.settingsIconContainer}
        onPress={() => {
          if (type === 'Podcasts') navigation.navigate('Home');
          else navigation.navigate('Podcasts');
        }}>
        <Icon name={type === 'Podcasts' || type === 'Episodes' ? 'arrow-left' : 'archive'} style={styles.settingsIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: safeWindowX * 0.06,
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logoContainer: {
    width: safeWindowX * 0.16,
    height: safeWindowX * 0.16,
    borderRadius: safeWindowX * 0.16 * 0.5,
    overflow: 'hidden',
  },
  header: {
    width: '50%',
    textAlign: 'center',
    fontSize: safeWindowX * 0.065,
    fontWeight: '400',
    paddingBottom: safeWindowX * 0.017,
    color: colors.mainText,
  },
  settingsIconContainer: {
    width: safeWindowX * 0.16,
    height: safeWindowX * 0.16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: safeWindowX * 0.11,
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
