import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {navigationStyle} from '../helpers/navigationSettings';
import colors from '../helpers/colors';
import {radioOptions} from '../../radioOptions';
import {AppContext} from '../helpers/state';

export default function Container(props: {children: React.ReactNode}) {
  const {appState} = useContext(AppContext);
  return (
    <View style={{flex: 1, backgroundColor: '#202020'}}>
      <ImageBackground
        source={radioOptions.radios[appState.selectedRadioIndex].backgroundImg}
        resizeMode="cover"
        blurRadius={colors.backgroundBlur}
        style={{flex: 1}}>
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
