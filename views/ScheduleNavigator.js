'use strict';

import React, { Component} from 'react';

import { StackNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/Entypo';

import ScheduleView    from './ScheduleView';
import EventDetailView from './EventDetailView';
import GuestDetailView from './GuestDetailView';


let ScheduleNavigator = StackNavigator({
  "ScheduleView": { screen: ScheduleView },
  "EventDetail" : { screen: EventDetailView },
  "GuestDetail" : { screen: GuestDetailView }
});

ScheduleNavigator.navigationOptions = {
  tabBarLabel: "Schedule",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="calendar" size={ 24 } color={ tintColor } />
  )
};

export default ScheduleNavigator;
