import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {pageNavigatorOptions} from './src/helpers/navigationSettings';
import {initializePlayer} from './src/helpers/setupPlayer';
import Episodes from './src/pages/Episodes';
import Home from './src/pages/Home';
import Podcasts from './src/pages/Podcasts';

const Stack = createNativeStackNavigator();

const App = () => {
  const [playerInitialized, setPlayerInitialized] = React.useState(false);

  useEffect(() => {
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

  return playerInitialized ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={pageNavigatorOptions} />
        <Stack.Screen name="Podcasts" component={Podcasts} options={pageNavigatorOptions} />
        <Stack.Screen name="Episodes" component={Episodes} options={pageNavigatorOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
};

export default App;
