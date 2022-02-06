import {StyleSheet} from 'react-native';
import colors from './colors';
import {safeWindowX} from './dimensions';

export interface navigationProps {
  navigation: {
    navigate: (arg0: string, params?: any) => void;
  };
  route?: object;
}
export const pageNavigatorOptions = {
  headerShown: false,
};

export const navigationStyle = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    alignItems: 'center',
  },
  usableArea: {
    width: safeWindowX,
    flex: 1,
    alignItems: 'center',
  },
});
