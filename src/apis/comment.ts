import axios from 'axios';

const baseUrl = '1';

const getListCommentOfPost = async postId => {
  try {
    const result = await axios.get(`${baseUrl}/post/getComment/${postId}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async id => {
  try {
    const result = await axios.delete(`${baseUrl}/comment/delete/${id}`);
    return result;
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
    return result;
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
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {getListCommentOfPost, deleteComment, addComment, editComment};
