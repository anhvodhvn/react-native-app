/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

const Exception = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'red'}}>Unknow Exception</Text>
      <Text>Click back to home</Text>
    </View>
  );
};

export default Exception;
