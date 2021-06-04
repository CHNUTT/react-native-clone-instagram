import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
// import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

import styles from './styles';

const Register = ({ signUpStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    signUpStart({ name, email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='name'
        onChangeText={(name) => setName(name)}
      />
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
      <Button title='Sign Up' onPress={onSignUp} />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentails) =>
    dispatch(userActions.userSignUpStart(userCredentails)),
});

export default connect(null, mapDispatchToProps)(Register);
