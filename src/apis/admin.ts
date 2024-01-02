import axios from 'axios';
import {configs} from '../config';

const baseUrl = configs.baseUrl;
const getUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/admin/getUser`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const changeRole = async data => {
  try {
    const response = await axios.put(`${baseUrl}/admin/changeRole`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async data => {
  try {
    const response = await axios.delete(`${baseUrl}/admin/deleteUser/${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async data => {
  try {
    const response = await axios.put(`${baseUrl}/admin/changePassword`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getListPost = async () => {
  try {
    const response = await axios.get(`${baseUrl}/admin/getListPost`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const approvePost = async data => {
  try {
    const response = await axios.put(`${baseUrl}/admin/approvePost/${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const declinePost = async data => {
  try {
    const response = await axios.delete(`${baseUrl}/admin/declinePost/${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {
  getUser,
  changeRole,
  changePassword,
  deleteUser,
  getListPost,
  approvePost,
  declinePost,
};
