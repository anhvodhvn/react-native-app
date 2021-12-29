import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, AppRegistry } from 'react-native';
import styles from '../../Styles';

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { authInfo, onLogout } = this.props;
        return (
            <View style={styles.container}>
                <Text>Welcome { authInfo.user ? authInfo.user.name : ''}</Text>
                <Text onPress={() => onLogout()}>Logout</Text>
            </View>
        );
    }
};

Welcome.propTypes = {
    title: PropTypes.string,
    authInfo: PropTypes.object,
    onLogout: PropTypes.func
};

export default Welcome;