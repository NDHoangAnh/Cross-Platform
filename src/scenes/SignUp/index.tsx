import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import styles from './index.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleSignUp = async () => {
    // console.log(username, email, password, cPassword);
    if (cPassword === password) {
      const response = await api.auth.register({username, email, password});
      // console.log(response?.data, response?.status);
      if (response?.data?.errMsg !== undefined) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${response?.data?.errMsg}`,
        });
      } else {
        navigation.navigate('VerifyOTP', {email});
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Toast />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>Signup</Text>
          <Text style={styles.note}>Create new account</Text>
        </View>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="gray"
            onChangeText={setUsername}
            value={username}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={setCPassword}
            value={cPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.register}>
              <Text style={styles.link}>Back to login</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../public/blue-gradient.png')}
          style={styles.image}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
