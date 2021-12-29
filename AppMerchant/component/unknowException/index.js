import React from 'react';
import { View, Text } from 'react-native';

const UnknowError = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>Unknow Exception</Text>
            <Text>Click back to home</Text>
        </View>
    );
};

export default UnknowError;