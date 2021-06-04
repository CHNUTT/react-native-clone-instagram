import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { userActions } from '../../redux/actions';

import LandingScreen from '../Landing';
import RegisterScreen from '../Register';
import MainScreen from '../Main';

const Stack = createStackNavigator();

const IndexScreen = ({ checkUserSession, currentUser, loading }) => {
  useEffect(() => {
    checkUserSession();
  }, []);

  return loading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : !currentUser ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen
          name='Landing'
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <MainScreen />
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  loading: user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(userActions.checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
