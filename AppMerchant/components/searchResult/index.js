import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ListView, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import styles from './styles';

const logo = require('../../images/master.png');

class SearchResult extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            showProgress: true,
            searchQuery: props.searchQuery,
            datasource: ds
        }
    }

    componentDidMount(){
        this.doSearch();
    }

    doSearch(){
        //console.log('search for keyword:', this.state.searchQuery);
        let url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(this.state.searchQuery);
        fetch(url)
        .then((response) => { 
            return response.json()
        })
        .then((data) => {
            this.setState({
                repositories: data.repositories,
                datasource: this.state.datasource.cloneWithRows(data.items)
            });
        })
        .finally(() => {
            this.setState({ showProgress: false });
        });
    }

    renderRow(rowData){
        return (
            <View style={{ padding: 20, borderColor: '#D7D7D7', borderBottomWidth: 1, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>{rowData.full_name}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginBottom: 20
                }}>
                    <View style={styles.repoCell}>
                        <Image source={logo} style={styles.repoCellIcon}></Image>
                        <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={logo} style={styles.repoCellIcon}></Image>
                        <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={logo} style={styles.repoCellIcon}></Image>
                        <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render(){
        if(this.state.showProgress){
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            )
        }
        
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 60 }}>
                <ListView dataSource={this.state.datasource} renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
};

SearchResult.propTypes = {
  title: PropTypes.string
};

export default SearchResult;