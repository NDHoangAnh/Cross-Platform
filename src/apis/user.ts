import axios from 'axios';
import {configs} from '../config';

const baseUrl = configs.baseUrl;

const editPass = async data => {
  try {
    const response = await axios.put(`${baseUrl}/user/editPass`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserData = async id => {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateUserData = async data => {
  try {
    const response = await axios.put(`${baseUrl}/user/edit`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {editPass, getUserData, updateUserData};
