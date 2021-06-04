import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title='Register'
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title='SignIn'
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default Landing;
