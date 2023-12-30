import {useState} from 'react';
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
import styles from './index.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      cPassword: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    const params = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const response = await api.auth.register(params);
    if (response?.data?.errMsg !== undefined) {
      if (response?.data?.errMsg === 'User is not verified') {
        navigation.navigate('VerifyOTP', {email: data.email});
        Toast.show({
          type: 'success',
          text1: 'Verify',
          text2: 'Recheck your email',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${response?.data?.errMsg}`,
        });
      }
    } else {
      navigation.navigate('VerifyOTP', {email: data.email});
    }
    setLoading(false);
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
          <Text style={styles.errors}>
            {errors.username ? errors.username.message : ''}
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'User name is required',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="gray"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />

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
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
          />

          <Text style={styles.errors}>
            {errors.cPassword ? errors.cPassword.message : ''}
          </Text>
          <Controller
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: value =>
                value === getValues('password') || 'Passwords do not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="cPassword"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
            )}
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
