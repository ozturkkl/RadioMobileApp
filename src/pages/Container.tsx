import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import radio from '../../radioOptions';
import {navigationStyle} from '../helpers/navigationSettings';
import colors from '../helpers/colors';

export default function Container(props: {children: object}) {
  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <ImageBackground source={radio.BACKGROUND_IMG} resizeMode="cover" blurRadius={colors.backgroundBlur} style={{flex: 1}}>
        <View style={styles.main}>
          <View style={styles.usableArea}>{props.children}</View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  ...navigationStyle,
});
