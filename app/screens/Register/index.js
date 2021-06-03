import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import styles from './styles';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = async () => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.toLowerCase(), password);
      if (!result) throw new Error('Internal Server Error');
      const user = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({ name, email });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
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

export default Register;
