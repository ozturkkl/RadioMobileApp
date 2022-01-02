import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {pageNavigatorOptions} from './src/helpers/navigationSettings';
import Home from './src/pages/Home';
import Podcasts from './src/pages/Podcasts';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={pageNavigatorOptions} />
        <Stack.Screen name="Podcasts" component={Podcasts} options={pageNavigatorOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
