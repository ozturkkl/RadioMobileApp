import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../helpers/colors';
import {safeWindowX} from '../helpers/dimensions';
import {radioOptions} from '../../radioOptions';

export default function LinksBar() {
  return (
    <View style={styles.linksContainer}>
      {radioOptions.links.map((link, idx) => (
        <TouchableOpacity key={idx} onPress={link.click}>
          <Icon name={link.iconLabel} size={20} style={styles.linkIcon} color={colors.mainText} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: colors.linksBackground,
    marginTop: safeWindowX * 0.045,
  },
  linkIcon: {
    paddingHorizontal: safeWindowX * 0.0375,
    paddingVertical: (safeWindowX * 0.0375) / 2,
    color: colors.mainText,
  },
});
