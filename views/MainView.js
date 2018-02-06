import React from 'react';

import {
  Alert,
  AsyncStorage,
  Dimensions,
  Navigator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


import { StackRouter, TabNavigator, StackNavigator } from 'react-navigation';

import DashboardView     from './DashboardView';
import ScheduleNavigator from './ScheduleNavigator';
import GuestsView        from './GuestsView';
import MoreView          from './MoreView';

import Toast from '../components/Toast';

import dataStore from '../dataStore';
import globalStyles from '../globalStyles';


let MainNavigator = TabNavigator({
  Home: {
    screen: DashboardView,
    path: ''
  },
  Schedule: {
    screen: ScheduleNavigator,
    path: 'schedule'
  },
  Guests: {
    screen: GuestsView,
    path: 'guests'
  },
  More: {
    screen: MoreView,
    path: 'more'
  }
}, {
  initialRouteName: 'Home'
});

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    let msg = "";

    Promise.all([
      dataStore.fetchFromStorage(),
      dataStore.fetchFromNetwork()
    ]).then(results => {
      console.log(results);
      let storageData = results[0];
      let networkData = results[1];
      let con_data = {};

      if (storageData && networkData) {
        // we have both, take whichever is newer
        if (storageData.updated >= networkData.updated) {
          msg = "No schedule updates found.";
          con_data = storageData;
        } else {
          msg = "Found schedule updates. Loading...";
          con_data = networkData;
          dataStore.saveToStorage(con_data);
        }
      } else if (storageData) {
        // network failure, use stored data
        con_data = storageData;
        msg = "No Internet connection. Using stored data from device.";
      } else if (networkData) {
        // first time we are running the app, download from network
        con_data = networkData;
        msg = "First time using app. Downloading schedule data...";
        dataStore.saveToStorage(con_data);
      } else {
        // first time we are running the app, and we have no connection. Bummer.
        msg = "First time, no connection";
      }

      //Alert.alert(msg);
      console.log("msg", msg);

      global.makeToast(msg);

      global.con_data = con_data;
      this.setState({
        loaded: true
      });
    }).done();
  }

  render() {
    console.log("Router:",MainNavigator.router);
    let main;
    if (this.state.loaded) {
      main = <MainNavigator />
    } else {
      main = <Text>Loading...</Text>
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={ styles.mainView }>
          { main }
          <Toast />
        </View>
      </SafeAreaView>
    )
  }
}

let styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'gray',
    flex: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 12
  },
  loading: {
    backgroundColor: 'white',
    opacity: 0.5,
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0
  },
  navbar: {
    backgroundColor: globalStyles.COLORS.headerBg,
    borderBottomColor: '#324',
    borderBottomWidth: 1,
  },
  scene: {
    paddingTop: 63
  }
});
