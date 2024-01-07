import React from 'react';
import {AppState} from './types';
import {setData} from './storage';

export const AppContext = React.createContext<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}>(null!);

export const DEFAULT_APP_STATE: AppState = {
  selectedRadioIndex: 0,
  showPodcastPlayerControls: false,
};

export const onSetState = (newState: AppState) => {
  setData('APP_STATE', {
    // only save stuff that we want to persist
    selectedRadioIndex: newState.selectedRadioIndex,
  });
};
