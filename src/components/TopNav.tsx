import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import radio from '../../radioOptions';
import {navigationProps} from '../helpers/navigationSettings';
import colors from '../helpers/colors';
import {safeWindowX} from '../helpers/dimensions';

interface props extends navigationProps {
  type: string;
}

export default function TopNav({navigation, type}: props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.logoContainer, styles.shadow]}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image source={radio.RADIO_ICON} style={{width: '100%', height: '100%'}} />
      </TouchableOpacity>

      <Text style={[styles.header, styles.textShadow]}>{type === 'Podcasts' || type === 'Episodes' ? 'Podcasts' : radio.RADIO_NAME}</Text>

      <TouchableOpacity
        style={styles.settingsIconContainer}
        onPress={() => {
          if (type === 'Podcasts') navigation.navigate('Home');
          else navigation.navigate('Podcasts');
        }}>
        <Icon name={type === 'Podcasts' || type === 'Episodes' ? 'arrow-left' : 'list'} style={styles.settingsIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
