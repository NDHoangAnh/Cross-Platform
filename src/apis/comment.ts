import axios from 'axios';

const baseUrl = 'http://192.168.196.89:8089';

const getListCommentOfPost = async postId => {
  try {
    const result = await axios.get(`${baseUrl}/post/getComment/${postId}`);
    console.log(result.data);

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/comment/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const addComment = async ({senderId, content, postId}) => {
  try {
    const result = await axios.put(`${baseUrl}/post/addComment`, {
      senderId,
      content,
      postId,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const editComment = async data => {
  try {
    const {commentId, senderId, content} = data;
    const result = await axios.put(
      `${baseUrl}/comment/updateComment/${commentId}`,
      {senderId, content}
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export {getListCommentOfPost, deleteComment, addComment, editComment};
