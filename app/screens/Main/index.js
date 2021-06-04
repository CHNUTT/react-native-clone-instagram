import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './Feed';
import AddScreen from './Add';
import ProfileScreen from './Profile';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Feed'
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='AddContainer'
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
        name='Profile'
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
    </Tab.Navigator>
  );
};

export default MainScreen;
