import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './index.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false); // State to control OTP input view

  const handleForgotPassword = async () => {
    console.log(email);

    const response = await api.auth.reqChangePassword({email});
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
  };

  const handleVerify = async code => {
    const data = {
      email,
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
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                onChangeText={setEmail}
                value={email}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Submit</Text>
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
              {showOtpInput ? 'Remember your password? ' : ''}
              <Text style={styles.link}>{showOtpInput ? 'Login' : ''}</Text>
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
