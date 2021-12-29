import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './style';
import SearchResult from '../searchResult';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ''
        }
    }

    onSearchPressed(){
        if(this.state.searchQuery && this.state.searchQuery != ''){
            this.props.navigator.push({
                title: 'Search Result',
                component: SearchResult,
                passProps: {
                    searchQuery: this.state.searchQuery
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.searchContainer}>
                <TextInput  style={styles.input} 
                            onChangeText={(value) => { this.setState({ searchQuery: value }) } } 
                            placeholder='enter keyword' 
                            autoCapitalize='none' >
                </TextInput>
                
                <TouchableHighlight 
                    onPress={this.onSearchPressed.bind(this)} 
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
        );
    }
};

Search.propTypes = {
  title: PropTypes.string
};

export default Search;