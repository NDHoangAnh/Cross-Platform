import axios from 'axios';
import {configs} from '../config';

const baseUrl = configs.baseUrl;

const getPostOfForum = async () => {
  try {
    const listPost = await axios.get(`${baseUrl}/post/getAllPost`);
    return listPost.data;
  } catch (error) {
    console.log(error);
  }
};

const getPostOfUser = async id => {
  try {
    console.log(1);

    const result = await axios.get(`${baseUrl}/post/getPersonalPost/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const addPost = async ({senderId, content, imageUrl}) => {
  try {
    const result = await axios.post(`${baseUrl}/post/add`, {
      senderId,
      content,
      imageUrl,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deletPost = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/post/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const editPost = async data => {
  try {
    const result = await axios.put(`${baseUrl}/post/edit`, {...data});
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (postId, senderId) => {
  try {
    const result = await axios.put(`${baseUrl}/post/like/${postId}`, {
      senderId,
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export {getPostOfForum, getPostOfUser, addPost, deletPost, editPost, likePost};
