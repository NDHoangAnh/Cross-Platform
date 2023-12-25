import axios from 'axios';
import {configs} from '../config';

const baseUrl = configs.baseUrl;

const getListScheduleForUser = async userId => {
  const resultList = await axios
    .get(`${baseUrl}/schedule/user/${userId}`)
    .then(response => response.data)
    .catch(error => console.error(error));
  return resultList;
};

const getPlan = async id => {
  const result = await axios
    .get(`${baseUrl}/plan/${id}`)
    .then(response => response.data)
    .catch(error => console.error(error));
  return result;
};

const deletePlan = async id => {
  const result = await axios
    .delete(`${baseUrl}/plan/delete/${id}`)
    .then(response => response.data)
    .catch(error => console.error(error));
  return result;
};

const updatePlan = async body => {
  const result = await axios
    .put(`${baseUrl}/plan/edit`, body)
    .then(response => response.data)
    .catch(error => console.error(error));
  return result;
};

const addPlan = async body => {
  const result = await axios
    .post(`${baseUrl}/plan/add`, body)
    .then(response => response.data)
    .catch(error => console.error(error));
  return result;
};

export {getListScheduleForUser, getPlan, deletePlan, updatePlan, addPlan};
