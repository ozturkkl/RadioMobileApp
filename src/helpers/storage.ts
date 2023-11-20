import AsyncStorage from '@react-native-async-storage/async-storage';
import {Podcast} from './types';

export interface AppSettings {
  VOLUME: number;
  PLAYRATE_TOAST_SHOWN: boolean;
  CACHED_PODCASTS: Podcast[];
}

type setDataTypes = keyof AppSettings;

export const setData = async <K extends setDataTypes>(key: K, value: AppSettings[K] | null) => {
  try {
    if (value === null) return AsyncStorage.removeItem(key);
    return AsyncStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: Date.now(),
      }),
    );
  } catch (e) {
    console.log(e);
  }
};

export const getData = async <K extends setDataTypes>(key: K): Promise<AppSettings[K] | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      return parsedValue.value;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
