import axios from 'axios';

const baseUrl = '1';

const getPostOfForum = async () => {
  try {
    const listPost = await axios.get(`${baseUrl}/post/getAllPost`);
    return listPost;
  } catch (error) {
    console.log(error);
  }
};

const getPostOfUser = async id => {
  try {
    const result = await axios.get(`${baseUrl}/post/getPersonalPost/${id}`);
    return result;
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

    return result;
  } catch (error) {
    console.log(error);
  }
};

const deletPost = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/post/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const editPost = async data => {
  try {
    const result = await axios.put(`${baseUrl}/post/edit`, {...data});
    return result;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (postId, senderId) => {
  try {
    const result = await axios.put(`${baseUrl}/post/like/${postId}`, {
      senderId,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export {getPostOfForum, getPostOfUser, addPost, deletPost, editPost, likePost};
