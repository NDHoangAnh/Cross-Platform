import axios from 'axios';

const baseUrl = '1';

const addActivity = async data => {
  try {
    const act = await axios.post(`${baseUrl}/activity/add`, data);
    return act;
  } catch (error) {
    console.log(error);
  }
};

const deleteActivity = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/activity/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const editActivity = async data => {
  try {
    const result = await axios.put(`${baseUrl}/activity/edit`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {addActivity, deleteActivity, editActivity};
