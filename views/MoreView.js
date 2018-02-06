import React, { Component } from 'react';

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/Entypo';

import globalStyles from '../globalStyles';

let window = Dimensions.get('window');


class MenuItem extends React.Component {

  render() {
    return (
      <TouchableOpacity style={ styles.menuItem } onPress={ () => this.props.navigator.navigate(this.props.link) }>
        <Icon name={ this.props.icon } size={16} color="white"/>
        <View style={{ width: 16 }} />
        <Text style={ styles.menuItemText }>{ this.props.text }</Text>
      </TouchableOpacity>
    )
  }
}

export default class MoreView extends React.Component {

  static navigationOptions = {
    title: "Schedule",
    tabBarLabel: "More",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="dots-three-horizontal" size={ 24 } color={ tintColor } />
    )
  };

  render() {
    return (
      <ScrollView style={ styles.container }>
        <MenuItem key="directions" link="directions" text="Maps & Directions" icon="map"    />
        <MenuItem key="gaming"     link="gaming"     text="Gaming"            icon="pencil" />
        <MenuItem key="feedback"   link="feedback"   text="Feedback"          icon="pencil" />
        <MenuItem key="newsfeed"   link="newsFeed"   text="News & Updates"    icon="bell"   />
        <MenuItem key="about"      link="about"      text="About"             icon="help"   />
      </ScrollView>
    )
  }

}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    height: window.height,
    paddingTop: 40
  },
  menuItem: {
    borderBottomColor: '#00000033',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
    width: window.width,
  },
  menuItemText: {
    fontSize: 16
  }
});
