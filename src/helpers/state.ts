import {createContext, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Podcast} from './types';

const DEFAULT_APP_STATE_PERSIST = {
  volume: 1,
  playrateToastShown: false,
  selectedRadioIndex: 0,
  cachedPodcasts: [] as Podcast[],
};
const DEFAULT_APP_STATE = {
  ...DEFAULT_APP_STATE_PERSIST,
  showPodcastPlayerControls: false,
};

type newStateType = Partial<typeof DEFAULT_APP_STATE> | ((prevState: typeof DEFAULT_APP_STATE) => Partial<typeof DEFAULT_APP_STATE>);

// eslint-disable-next-line no-spaced-func
export const AppContext = createContext<{
  stateInitialized: boolean;
  appState: typeof DEFAULT_APP_STATE;
  setAppState: (newState: newStateType) => void;
}>(null!);

export const useAppState = () => {
  const [appState, setState] = useState(DEFAULT_APP_STATE);
  const [stateInitialized, setStateInitialized] = useState(false);
  const equal = require('fast-deep-equal/es6');

  const setAppState = useCallback(
    (newState: newStateType) => {
      const nS = typeof newState === 'function' ? newState(appState) : newState;

      if (!equal(appState, {...appState, ...nS})) {
        console.log(`kemalog - setting state with: ${JSON.stringify(nS)}, stateInitialized: ${stateInitialized}`);
        setState(prevState => ({
          ...prevState,
          ...nS,
        }));
      }

      // set the changed props to AsyncStorage for persistence
      if (!stateInitialized) return;

      const persistingKeys = Object.keys(DEFAULT_APP_STATE_PERSIST);
      const stateEntries = Object.entries(nS).filter(([key, value]) => persistingKeys.includes(key) && value !== undefined);

      if (stateEntries.length) {
        AsyncStorage.multiSet(stateEntries.map(([key, value]) => [key, JSON.stringify(value)]));
      }

      // console.log('updated state with:', nS);
    },
    [stateInitialized, appState, equal],
  );

  useEffect(() => {
    const loadState = async () => {
      const keys = Object.keys(DEFAULT_APP_STATE_PERSIST);
      const stateEntries = await AsyncStorage.multiGet(keys);
      const loadedState = stateEntries.reduce((acc, [key, value]) => {
        const typedKey = key as keyof typeof DEFAULT_APP_STATE_PERSIST;
        if (value !== null) {
          acc[typedKey] = JSON.parse(value);
        }
        return acc;
      }, {} as Partial<typeof DEFAULT_APP_STATE>);
      setAppState({
        ...DEFAULT_APP_STATE,
        ...loadedState,
      });
      setStateInitialized(true);
    };
    loadState();
  }, [setAppState]);

  return [appState, setAppState, stateInitialized] as const;
};
