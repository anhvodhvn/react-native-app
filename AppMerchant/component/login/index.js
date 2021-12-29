import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, Text, View, TextInput, Image, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import buffer from 'buffer';
import authService from '../../services/authService';
import styles from '../../Styles';

const logo = require('../../images/master.png');

class Login extends Component {
    constructor(props){
      super(props);

      this.state = {
          username: '',
          password: '',
          showProgress: false,
          error: null
      }
    }

    onChangeUserName(value) {
        //TextInput: autoCapitalize enum('none', 'sentences', 'words', 'characters')
        this.setState({ username: value });
    }

    onChangePassword(value) {
        this.setState({ password: value });
    }

    onLoginPressed() {
        this.setState({ showProgress: true });

        authService.login({ 
            username: this.state.username, 
            password: this.state.password 
        }, (result) => {
            if(!result.success) {
                this.setState({ error: result.error });
                this.setState({ showProgress: false });
            }
            else {
                this.props.onLogin();
            }
        });
    }

    render() {
        let errorCtrl = <View />;
        if(this.state.error && this.state.error.badCredentials){
            errorCtrl = <Text style={styles.error}>username and password is invalid</Text>
        }
        else if(this.state.error && this.state.error.unknowError){
            errorCtrl = <Text style={styles.error}>unexpected result</Text>
        }

        return (
            <View style={styles.loginContainer}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.heading}>Github browser</Text>
                <TextInput style={styles.input} placeholder='Github username' onChangeText={(value) => this.onChangeUserName(value)} autoCapitalize='none'/> 
                <TextInput style={styles.input} placeholder='Github password' secureTextEntry={true} onChangeText={(value) => this.onChangePassword(value)}/>
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableHighlight>
                
                {errorCtrl}

                <ActivityIndicator animating={this.state.showProgress} size='large' style={styles.loader}>
                </ActivityIndicator>
            </View>
        );
    }
  };
  
  Login.propTypes = {
    onLogin: PropTypes.func
  };
  
  export default Login;