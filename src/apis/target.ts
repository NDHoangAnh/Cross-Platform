import axios from "axios/index";
import {baseUrl} from "./klass";

const getAllTargets = async ({userId}) => {
  try {
    return await axios.get(`${baseUrl}/target/getListTarget`,{
      params: {
        userId
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getTargetById = async (targetId) => {
  try {
    return await axios.get(`${baseUrl}/target/getTarget/${targetId}`);
  } catch (error) {
    console.log(error);
  }
};

const createTarget = async (data) => {
  try {
    return await axios.post(`${baseUrl}/target/addTarget`,data);
  } catch (error) {
    console.log(error);
  }
};

const editTarget = async (data) => {
  try {
    return await axios.put(`${baseUrl}/target/editTarget`, data);
  } catch (error) {
    console.log(error);
  }
};

const deleteTarget = async (targetId) => {
  try {
    return await axios.delete(`${baseUrl}/target/delete/${targetId}`,);
  } catch (error) {
    console.log(error);
  }
};

export {getTargetById, getAllTargets, editTarget, deleteTarget, createTarget }