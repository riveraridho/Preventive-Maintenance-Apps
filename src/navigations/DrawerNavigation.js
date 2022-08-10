import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ScreenNavigation} from './ScreenNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={ScreenNavigation} />
      <Drawer.Screen name="Contact" component={ScreenNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
