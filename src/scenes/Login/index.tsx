import {useState, useEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './index.style';
import api from '../../apis';

const Login = ({navigation, route, setIsLoggedIn}) => {
  const {verify} = route.params || 'none';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (verify === 'created') {
      Toast.show({
        type: 'success',
        text1: 'Account verify',
        text2: 'You can now login',
      });
    } else if (verify === 'reset') {
      Toast.show({
        type: 'success',
        text1: 'Account reset',
        text2: 'Your new password is 123456',
      });
    }
  }, [verify]);

  const handleLogin = async () => {
    const response = await api.auth.login({email, password});

    if (response?.data?.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${response?.data?.errMsg}`,
      });
    } else {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      setIsLoggedIn(true);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotpassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Toast />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity onPress={handleForgotpassword}>
            <Text style={styles.register}>
              <Text style={styles.link}>Forgot your password?</Text>
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

export default Login;
