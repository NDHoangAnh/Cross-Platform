import {useState} from 'react';
import {Image, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './User.style';
import api from '../../apis';
import Toast from 'react-native-toast-message';
import {useForm, Controller} from 'react-hook-form';
function User({userId, role, username, avatar}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChangeRoleModal, setIsChangeRoleModal] = useState(false);
  const [isChangePassModal, setIsChangePassModal] = useState(false);

  // additional modal
  const setRole = async data => {
    const res = await api.admin.changeRole({
      userId: userId,
      role: data,
    });
    if (res?.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Changed Role Successfully`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${res?.data?.errMsg}`,
      });
    }
    setIsChangeRoleModal(false);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      cPassword: '',
    },
  });

  const deleteUser = async () => {
    await api.admin.deleteUser(userId);
    setModalVisible(false);
  };

  const onSubmit = async data => {
    const params = {
      password: data.password,
      userId,
    };
    const response = await api.admin.changePassword(params);
    if (response?.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Change Password Successfully`,
      });
      reset();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${response?.data?.errMsg}`,
      });
    }
    setIsChangePassModal(false);
  };
  //

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="ellipsis-h" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsChangeRoleModal(true);
              setModalVisible(false);
            }}
            style={styles.modalButton}>
            <Text style={styles.buttonText}>Change Role</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsChangePassModal(true);
              setModalVisible(false);
            }}
            style={styles.modalButton}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteUser} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isChangeRoleModal}
        onBackdropPress={() => setIsChangeRoleModal(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setRole('Admin')}
            style={styles.modalButton}>
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('User')}
            style={styles.modalButton}>
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isChangePassModal}
        onBackdropPress={() => setIsChangePassModal(false)}>
        <View style={styles.textbox}>
          <Text style={styles.title}>Change Password</Text>
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
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default User;
