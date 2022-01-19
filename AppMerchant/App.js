import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import BottomNavigation from './navigation/bottomNavigation';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{title: 'App Merchant'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;