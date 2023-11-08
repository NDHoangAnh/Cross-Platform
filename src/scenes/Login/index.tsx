/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './index.style';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(email, password);
  };

  const handleSignUp = () => {
    console.log('signup page');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.note}>Please login to continue.</Text>
      </View>
      <View style={styles.textbox}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.register}>
            Don't have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
