import {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './index.style';
import api from '../../apis';
import asyncData from '../../config/auth';

const Login = ({navigation, route, setIsLoggedIn, setRole}) => {
  const [loading, setLoading] = useState(false);
  const {verify} = route.params || 'none';

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  const onSubmit = async data => {
    try {
      setLoading(true);

      const response = await api.auth.login(data);
      console.log(response)
      if (response?.data?.errMsg !== undefined) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${response?.data?.errMsg}`,
        });
      } else {
        await AsyncStorage.clear();
        await asyncData.addData(response?.data);
        setIsLoggedIn(true);
        setRole(response?.data?.role);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <Text style={styles.errors}>
            {errors.email ? errors.email.message : ''}
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, // Email regex
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <Text style={styles.errors}>
            {errors.password ? errors.password.message : ''}
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
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
