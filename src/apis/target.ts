import axios from 'axios/index';
import {configs} from '../config';

const baseUrl = configs.baseUrl;

const getAllTargets = async ({userId}) => {
  try {
    const result = await axios.get(`${baseUrl}/target/getListTarget`, {
      params: {
        userId,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getTargetById = async targetId => {
  try {
    const result = await axios.get(`${baseUrl}/target/getTarget/${targetId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const createTarget = async data => {
  try {
    const result = await axios.post(`${baseUrl}/target/addTarget`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const editTarget = async data => {
  try {
    const result = await axios.put(`${baseUrl}/target/editTarget`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTarget = async targetId => {
  try {
    const result = await axios.delete(`${baseUrl}/target/delete/${targetId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export {getTargetById, getAllTargets, editTarget, deleteTarget, createTarget};
