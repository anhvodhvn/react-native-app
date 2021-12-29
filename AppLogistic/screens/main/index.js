import React from 'react';
import {Provider} from 'react-redux';
import {Text, View, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Welcome from '../welcome';
import Info from '../info';

import configureStore from '../../store';
const store = new configureStore();

function HomeScreen({navigation}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Click to Logistic App</Text>
      <Button title="Welcome" onPress={() => navigation.navigate('Welcome')} />
      <Text>Click to Info</Text>
      <Button title="Info" onPress={() => navigation.navigate('Info')} />
    </View>
  );
}

const Main = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Home',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{title: 'Welcome'}}
            />
            <Stack.Screen 
              name="Info" 
              component={Info} 
              options={{title: 'Info'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default Main;
