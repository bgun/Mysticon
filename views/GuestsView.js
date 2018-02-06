'use strict';

import _ from 'lodash';
import React from 'react';

import {
  InteractionManager,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import GuestItem from '../components/GuestItem';


export default class GuestsView extends React.Component {

  static navigationOptions = {
    tabBarLabel: "Guests",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="users" size={ 24 } color={ tintColor } />
    )
  };

  constructor(props) {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let sortedGuests = _.sortBy(global.con_data.guests, 'name');
    this.state = {
      dataSource: ds.cloneWithRows(sortedGuests)
    };
  }

  render() {
    return (
      <ListView
        style={ styles.scroll }
        dataSource={ this.state.dataSource }
        renderRow={ rowData => <GuestItem key={ rowData.guest_id } guest_id={ rowData.guest_id } /> }
      />
    );
  }

}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFFF',
    flex: 1
  }
});
