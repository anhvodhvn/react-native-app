import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, View, Text, Image, AppRegistry, ActivityIndicator, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import styles from '../../Styles';
import authService from '../../services/authService';
import FeedDetail from '../feedDetail';

class Feed extends Component {
    constructor(props) {
        super(props);
        
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds,
            showProgress: true
        };
    }

    componentDidMount(){
        this.fetchFeed();
    }

    pressRow(rowData){
        this.props.navigator.push({
            title: 'Push Event',
            component: FeedDetail,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    fetchFeed(){
        authService.getAuthInfo((error, authInfo) => {
            if(error) 
                throw error;

            let login = authInfo.user ? authInfo.user.login : '';
            let url = 'https://api.github.com/users/' + login + '/received_events';
            
            fetch(url, {
                headers: authInfo.header
            })
            .then((response) => response.json())
            .then((data) => {
                let feedItems = _.filter(data, (ev) => { return ev.type == 'PushEvent' || ev.type == 'PullRequestEvent'});
                this.setState({ 
                    dataSource: this.state.dataSource.cloneWithRows(feedItems),
                    showProgress: false
                });
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
        });
    }

    renderRow(rowData, sectionID, rowID){
        return (
            <TouchableHighlight onPress={() => this.pressRow(rowData)} underlayColor='#ddd'>
                <View style={{ 
                    flex: 1, 
                    flexDirection: 'row', 
                    padding: 20,
                    alignItems: 'center', 
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1
                }}>

                    <Image  source={{ uri: rowData.actor.avatar_url }}
                            style={{ height: 36, width: 36, borderRadius: 18 }}>
                    </Image>

                    <View style={{ paddingLeft: 20 }}>
                        <Text style={{ backgroundColor: '#FFF' }}>
                            {moment(rowData.create_at).fromNow()}
                        </Text>
                        <Text style={{ backgroundColor: '#FFF' }}>
                            <Text style={{ fontWeight: '600' }}>{rowData.actor.login}</Text> push to 
                        </Text>
                        <Text style={{ backgroundColor: '#FFF' }}>
                            {rowData.payload.ref ? rowData.payload.ref.replace('refs/heads/','') : ''}
                        </Text>
                        <Text style={{ backgroundColor: '#FFF' }}>
                            at <Text style={{ fontWeight: '600' }}>{rowData.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
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
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                backgroundColor: '#FFF',
                //alignSelf: 'center',
                paddingTop: 80
            }}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} />
            </View>
        );
    }
};

Feed.propTypes = {
  title: PropTypes.string
};

export default Feed;