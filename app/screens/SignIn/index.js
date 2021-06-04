import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
// import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

import styles from './styles';

const SignInScreen = ({ signInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    signInStart({ email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='email'
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title='Sign In' onPress={onSignIn} />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (userCredentails) =>
    dispatch(userActions.userSignInStart(userCredentails)),
});

export default connect(null, mapDispatchToProps)(SignInScreen);
