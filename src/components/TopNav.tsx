import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {navigationProps} from '../helpers/navigationSettings';
import colors from '../helpers/colors';
import {safeWindowX} from '../helpers/dimensions';
import {radioOptions} from '../../radioOptions';
import {AppContext} from '../helpers/state';
import {globalStyles} from '../helpers/styles';
import RadioSwitchIcon from './radio/RadioSwitchIcon';

interface props extends navigationProps {
  type: string;
}

export default function TopNav({navigation, type}: props) {
  const {appState} = useContext(AppContext);

  return (
    <View style={styles.container}>
      {type !== 'Home' ? (
        <RadioSwitchIcon
          onClick={() => {
            navigation.navigate('Home');
          }}
        />
      ) : (
        <RadioSwitchIcon />
      )}

      <Text style={[styles.header, globalStyles.textShadow]}>
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
});
