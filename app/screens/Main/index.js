import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

import FeedScreen from './Feed';
import AddScreen from './Add';
import ProfileScreen from './Profile';

const Tab = createMaterialBottomTabNavigator();

const MainScreen = ({ signOut }) => {
  return (
    <Tab.Navigator labeled={false}>
      <Tab.Screen
        name='FeedTab'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='AddTab'
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          },
        })}
        component={AddScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus-box' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='SignOut'
        component={ProfileScreen}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
            signOut();
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='logout-variant'
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(userActions.userSignOutStart()),
});

export default connect(null, mapDispatchToProps)(MainScreen);
