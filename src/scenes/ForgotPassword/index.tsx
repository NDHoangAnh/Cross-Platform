import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './index.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  // State to control OTP input view
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    const response = await api.auth.reqChangePassword(data);
    // console.log(response?.data);
    if (response?.data?.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${response?.data?.errMsg}`,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Check your mail!',
      });
      setShowOtpInput(true);
    }
    setLoading(false);
  };

  const handleVerify = async code => {
    const data = {
      email: getValues('email'),
      otp: Number(code),
    };
    console.log(data);

    const response = await api.auth.resetPass(data);
    if (response?.data?.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: `${response?.data?.errMsg}`,
      });
    } else {
      navigation.navigate('Login', {verify: 'reset'});
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Toast />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>
            {showOtpInput ? 'Enter OTP' : 'Forgot Password'}
          </Text>
          <Text style={styles.note}>
            {showOtpInput
              ? 'Enter the 4-digit code sent to your email.'
              : 'Enter your email to reset your password.'}
          </Text>
        </View>
        <View style={styles.textbox}>
          {!showOtpInput ? (
            <>
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <OTPInputView
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputFieldStyle={
                (styles.underlineStyleBase, {color: 'black'})
              }
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              style={styles.otpArea}
              onCodeFilled={handleVerify}
            />
          )}
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.register}>
              Remember your password?
              <Text style={styles.link}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Image
        source={require('../../../public/blue-gradient.png')}
        style={styles.image}
      />
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
