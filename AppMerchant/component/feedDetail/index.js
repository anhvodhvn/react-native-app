import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, View, Text, Image } from 'react-native';
import moment from 'moment';
import styles from '../../Styles';

class FeedDetail extends Component {
    constructor(props) {
        super(props);
        
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
            pushEvent: props.pushEvent
        };
    }

    renderRow(rowData){
        return (
            <View style={{ 
                flex: 1, 
                justifyContent: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingBottom: 20,
                paddingTop: 20,
                padding: 10
            }}>
                <Text>
                    <Text style={styles.text_bold}>{rowData.sha.substring(0,6)}</Text> - {rowData.message}
                </Text>
            </View>
        )
    }

    render(){
        return (
            <View style={{ flex: 1, paddingTop: 120, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image  source={{ uri: this.state.pushEvent.actor.avatar_url }}
                        style={{ height: 120, width: 120, borderRadius: 60 }}></Image>
                <Text style={{ paddingTop: 20, paddingBottom: 20, fontSize: 20 }}>{moment(this.state.pushEvent.create_at).fromNow()}</Text>
                <Text>
                    <Text style={styles.text_bold}>{this.state.pushEvent.actor.login}</Text> push to
                </Text>
                <Text style={styles.text_bold}>{this.state.pushEvent.payload.ref.replace('refs/heads/', '')}</Text>
                <Text>at <Text style={styles.text_bold}>{this.state.pushEvent.repo.name}</Text>
                </Text>
                <Text style={{paddingTop: 40, fontSize: 20 }}>
                    {this.state.pushEvent.payload.commits.length} Commit(s)
                </Text>
                
                <ListView contentInset={{ top: -50 }} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
            </View>
        );
    }
};

FeedDetail.propTypes = {
  title: PropTypes.string,
  pushEvent: PropTypes.object
};

export default FeedDetail;