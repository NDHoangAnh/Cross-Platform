import React from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './index.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const VerifyOTP = ({navigation, route}) => {
  const {email} = route.params;

  const handleGoBack = () => {
    navigation.navigate('SignUp');
  };

  const handleVerify = async code => {
    const data = {
      email,
      otp: code,
    };
    const response = await api.auth.verifyOTP(data);
    if (response?.data?.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${response?.data?.errMsg}`,
      });
    } else {
      navigation.navigate('Login', {verify: 'created'});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Toast />
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>&lt; Go back</Text>
      </TouchableOpacity>
      <Text>Verify your account</Text>
      <OTPInputView
        pinCount={4}
        autoFocusOnLoad={false}
        codeInputFieldStyle={(styles.underlineStyleBase, {color: 'black'})}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        style={styles.otpArea}
        onCodeFilled={handleVerify}
      />
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
