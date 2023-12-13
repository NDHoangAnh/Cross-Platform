import axiosInstance from './axios';

const getUser = async () => {
  try {
    const response = await axiosInstance.get('/admin/getUser');
    return response;
  } catch (error) {
    console.error(error);
  }
};

const changeRole = async data => {
  try {
    const response = await axiosInstance.put('/admin/changeRole', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async data => {
  try {
    const response = await axiosInstance.delete(`/admin/deleteUser/${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async data => {
  try {
    const response = await axiosInstance.put('/admin/changePassword', data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getListPost = async () => {
  try {
    const response = await axiosInstance.get('/admin/getListPost');
    return response;
  } catch (error) {
    console.error(error);
  }
};

const approvePost = async data => {
  try {
    console.log(data);
    const response = await axiosInstance.put(`/admin/approvePost/${data}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const declinePost = async data => {
  try {
    const response = await axiosInstance.delete(`/admin/declinePost/${data}`);
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
