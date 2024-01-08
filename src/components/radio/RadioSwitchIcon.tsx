import React, {useContext, useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import {globalStyles} from '../../helpers/styles';
import {AppContext} from '../../helpers/state';
import {radioOptions} from '../../../radioOptions';
import {setupRadio} from '../../helpers/setupPlayer';
import {safeWindowX} from '../../helpers/dimensions';

const initialAnimationPosition = -safeWindowX * 0.16 * 0.38;
const swappingAnimationPosition = -safeWindowX * 0.16 * 0.46;
const initialScale = 0.33;

export default function RadioSwitchIcon({onClick}: {onClick?: () => void}) {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const scale = useRef(new Animated.Value(initialScale)).current;
  const zIndex = useRef(new Animated.Value(0)).current;

  const {appState, setAppState} = useContext(AppContext);

  const changeStations = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pan, {
        toValue: {x: 0, y: 0},
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pan.setValue({x: 0, y: 0});
      scale.setValue(initialScale);
      zIndex.setValue(0);

      setAppState(state => {
        const newRadioIndex = (state.selectedRadioIndex + 1) % radioOptions.radios.length;
        TrackPlayer.getState().then(async state => {
          await setupRadio(newRadioIndex);
          if (state === State.Playing) TrackPlayer.play();
        });

        return {...appState, selectedRadioIndex: newRadioIndex};
      });

      Animated.timing(pan, {
        toValue: {x: swappingAnimationPosition, y: swappingAnimationPosition},
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        zIndex.setValue(1);
        Animated.timing(pan, {
          toValue: {x: initialAnimationPosition, y: initialAnimationPosition},
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  useEffect(() => {
    Animated.timing(pan, {
      toValue: {x: swappingAnimationPosition, y: swappingAnimationPosition},
      duration: 200,
      useNativeDriver: true,
      delay: 500,
    }).start(() => {
      zIndex.setValue(1);
      Animated.timing(pan, {
        toValue: {x: initialAnimationPosition, y: initialAnimationPosition},
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [pan, zIndex]);

  return (
    <TouchableOpacity
      style={[styles.container, globalStyles.shadow]}
      onPress={() => {
        if (onClick) onClick();
        else changeStations();
      }}>
      <Image style={[globalStyles.shadow, styles.image]} source={radioOptions.radios[appState.selectedRadioIndex].image} />
      {radioOptions.radios.length > 1 && onClick === undefined && (
        <Animated.Image
          style={[
            globalStyles.shadow,
            styles.image,
            styles.secondaryRadioImage,
            {
              transform: [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}],
              zIndex: zIndex,
            },
          ]}
          source={radioOptions.radios[(appState.selectedRadioIndex + 1) % radioOptions.radios.length].image}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: safeWindowX * 0.16,
    height: safeWindowX * 0.16,
  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 99999,
    overflow: 'hidden',
    zIndex: 1,
  },

  secondaryRadioImage: {
    borderColor: '#00000055',
    borderWidth: 1,
  },
});
