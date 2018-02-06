'use strict';

import React, { Component} from 'react';

import { StackNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/Entypo';

import DirectionsView from './DirectionsView';
import HotelMapView   from './HotelMapView';


let DirectionsNavigator = StackNavigator({
  "Directions" : { screen: DirectionsView },
  "HotelMap"   : { screen: HotelMapView }
});

DirectionsNavigator.navigationOptions = {
  tabBarLabel: "Directions",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="map" size={ 24 } color={ tintColor } />
  )
};

export default DirectionsNavigator;