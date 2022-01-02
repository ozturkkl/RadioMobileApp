import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value || null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
