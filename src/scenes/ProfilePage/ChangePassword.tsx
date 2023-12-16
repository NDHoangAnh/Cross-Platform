import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styles from './ChangePassword.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const route = useRoute();

  const email = route.params;

  const handleChangePassword = async () => {
    setLoading(true);
    const data = {
      email: email,
      oldPass: oldPassword,
      newPass: newPassword,
      confirmPass: confirmPassword,
    };
    const result = await api.user.editPass(data);
    if (result.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${result?.errMsg}`,
      });
    } else {
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Toast />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.heading}>Change Password</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Old Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.label}>New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleChangePassword}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../public/edit-image.png')}
        style={styles.image}
      />
    </ScrollView>
  );
};

export default ChangePassword;
