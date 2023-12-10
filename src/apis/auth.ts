import axios from 'axios';

// NOTE: Dùng máy ảo không dùng localhost được mà phải 10.0.2.2
// đoạn này chưa bt xử lí nnao với chưa cho .env
const baseUrl = 'http://192.168.0.104:8089';
// nếu dùng máy thật, vào terminal, gõ ipconfig, thay 10.0.2.2 thành địa chỉ IPv4

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

export { login, register, verifyOTP, reqChangePassword, resetPass };
