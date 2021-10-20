import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import Home from './src/pages/Home';
import Settings from './src/pages/Settings';


const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const pageNavigatorOptions = {
    headerShown: false,
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={pageNavigatorOptions}
        />
        <Stack.Screen name="Settings" component={Settings} options={pageNavigatorOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
