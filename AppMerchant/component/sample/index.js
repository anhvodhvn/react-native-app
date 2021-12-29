import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, AppRegistry } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const spImage = require('../../images/sharepoint-hub-site.png');

class Sample extends Component {
  constructor(props){
    super(props);
    this.state = {
      picture: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      }
    }
  }

  render() {
    let { author } = this.props;
    let { picture } = this.state;
    return (
      <View style={styles.container}>
        <Text>First React-Native-App !</Text>
        <Image source={picture} style={{width: 193, height: 110}}/>

        <Text>SharePoint</Text>
        <Image source={spImage} style={{width: 293, height: 210}}/>
        <Text>CopyRight@2017 - Author: {author}</Text>      
      </View>
    );
  }
};

Sample.propTypes = {
  author: PropTypes.string
};

export default Sample;