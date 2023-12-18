import AsyncStorage from '@react-native-async-storage/async-storage';

const addData = async data => {
  try {
    await AsyncStorage.setItem('id', data._id);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('role', data.role);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getData = async () => {
  try {
    const id = await AsyncStorage.getItem('id');
    const email = await AsyncStorage.getItem('email');
    const role = await AsyncStorage.getItem('role');
    const result = {
      id,
      email,
      role,
    };

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {getData, addData};
