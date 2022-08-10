import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import {
  Dashboard,
  ListSchedule,
  ViewSchedule,
  CreateSchedule,
  EditSchedule,
  ViewNetwork,
  ListNetwork,
  CreateNetwork,
  EditNetwork,
  CreateEnduser,
  ListEnduser,
  ViewEnduser,
  EditEnduser,
  ViewEnduser2,
} from '../screens';

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
        initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Dashboard', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="ListSchedule"
          component={ListSchedule}
          options={({navigation}) => ({
            title: 'List Schedule',
            headerTitleAlign: 'center',
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateSchedule')}>
                  <Text style={styles.titleText}>ADD</Text>
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="ViewSchedule"
          component={ViewSchedule}
          options={{
            title: 'View Schedule',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateSchedule"
          component={CreateSchedule}
          options={{title: 'Create Schedule', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="EditSchedule"
          component={EditSchedule}
          options={{
            title: 'Edit Schedule',
            headerTitleAlign: 'center',
          }}
        />
        {/* Network */}
        <Stack.Screen
          name="ListNetwork"
          component={ListNetwork}
          options={({navigation}) => ({
            title: 'Network List',
            headerTitleAlign: 'center',
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateNetwork')}>
                  <Text style={styles.titleText}>ADD</Text>
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="CreateNetwork"
          component={CreateNetwork}
          options={{title: 'Create Network', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="ViewNetwork"
          component={ViewNetwork}
          options={{title: 'View Network', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="EditNetwork"
          component={EditNetwork}
          options={{title: 'EditNetwork', headerTitleAlign: 'center'}}
        />
        {/* End User */}
        <Stack.Screen
          name="ListEnduser"
          component={ListEnduser}
          options={({navigation}) => ({
            title: 'List Enduser',
            headerTitleAlign: 'center',
            headerRight: () => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateEnduser')}>
                  <Text style={styles.titleText}>ADD</Text>
                </TouchableOpacity>
              );
            },
          })}
        />
        <Stack.Screen
          name="CreateEnduser"
          component={CreateEnduser}
          options={{title: 'Create Enduser', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="ViewEnduser"
          component={ViewEnduser}
          options={{title: 'View Enduser', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="EditEnduser"
          component={EditEnduser}
          options={{title: 'Edit Enduser', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ScreenNavigation;
