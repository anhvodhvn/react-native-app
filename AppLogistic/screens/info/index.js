import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view'; 
import Screen01 from './screen01';
import Screen02 from './screen02';

const Container = function() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' }
  ]);

  const renderScene = SceneMap({
    first: Screen01,
    second: Screen02
  });
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Container;
