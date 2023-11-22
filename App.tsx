import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {pageNavigatorOptions} from './src/helpers/navigationSettings';
import {initializePlayer} from './src/helpers/setupPlayer';
import Episodes from './src/pages/Episodes';
import Home from './src/pages/Home';
import Podcasts from './src/pages/Podcasts';
import {AppState} from './src/helpers/types';
import {AppContext, DEFAULT_APP_STATE, onSetState as onAppStateChanged} from './src/helpers/state';
import {getData} from './src/helpers/storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const [appState, setAppState] = useState<AppState>(DEFAULT_APP_STATE);

  useEffect(() => {
    getData('APP_STATE').then(data => {
      if (data) {
        setAppState((state: AppState) => {
          return {
            ...state,
            ...data,
          };
        });
      }
    });
    initializePlayer()
      .catch(e => {
        if (e.message !== 'The player has already been initialized via setupPlayer.') {
          console.error(e);
        }
      })
      .finally(() => {
        setPlayerInitialized(true);
      });
  }, []);

  useEffect(() => {
    onAppStateChanged(appState);
  }, [appState]);

  return playerInitialized ? (
    <AppContext.Provider value={{appState, setAppState}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={pageNavigatorOptions} />
          <Stack.Screen name="Podcasts" component={Podcasts} options={pageNavigatorOptions} />
          <Stack.Screen name="Episodes" component={Episodes} options={pageNavigatorOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  ) : null;
};

export default App;
