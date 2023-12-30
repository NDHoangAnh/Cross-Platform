import axios from 'axios';
import {configs} from '../config';

const baseUrl = configs.baseUrl;

const login = async data => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const register = async data => {
  try {
    const response = await axios.post(`${baseUrl}/register`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const verifyOTP = async data => {
  try {
    const response = await axios.post(`${baseUrl}/verifyOTP`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const reqChangePassword = async data => {
  try {
    const response = await axios.post(`${baseUrl}/reqChangePass`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const resetPass = async data => {
  try {
    const response = await axios.post(`${baseUrl}/resetPass`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {login, register, verifyOTP, reqChangePassword, resetPass};
