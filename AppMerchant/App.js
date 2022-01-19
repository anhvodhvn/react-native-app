import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Profile from './screens/profile';
import Settings from './screens/settings';

const Main = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';              
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}          
    >
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Profile',
              headerTitleAlign: 'center',              
            }}
          />

          <Stack.Screen name="Main" component={Main} options={{title: 'Main Navigation'}} />
                    
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;