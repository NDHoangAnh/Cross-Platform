/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import Comment from '../../containers/Comment/Comment';
import apis from '../../apis';
import Navbar from '../../components/Navbar';
import asyncData from '../../config/auth';

type CommentData = {
  id: string | null;
  content: string | null;
  username: string | null;
  avatar: string | null;
  createdAt: Date | null;
  belongToUser: boolean | null;
};

function ListComments({route}) {
  const {postId} = route.params;
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [idToEdit, setIdToEdit] = useState(null);

  const handleGetListComments = async () => {
    try {
      const user = await asyncData.getData();
      const data = await apis.comment.getListCommentOfPost(postId);
      if (data !== null && Array.isArray(data)) {
        const listCommentOfPost: CommentData[] = data.map(item => ({
          id: item?._id,
          content: item?.content || null,
          username: item?.senderId?.username || null,
          avatar: item?.senderId?.avatar || null,
          createdAt: item?.createdAt || null,
          belongToUser: item?._id === user?.id || null,
        }));

        setComments(listCommentOfPost);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (content.trim() !== '') {
        const user = await asyncData.getData();
        await apis.comment.addComment({
          senderId: user?.id,
          postId,
          content,
        });
        await handleGetListComments();
        setContent('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async id => {
    try {
      await apis.comment.deleteComment(id);
      await handleGetListComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async () => {
    try {
      if (content.trim() !== '') {
        const user = await asyncData.getData();
        await apis.comment.editComment({
          commentId: idToEdit,
          senderId: user?.id,
          content,
        });
        setIdToEdit(null);
        await handleGetListComments();
        setContent(''); // Reset the content after editing
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetListComments();
    }, [])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <>
          <View style={{flex: 1}}>
            <Navbar listAction={[]} />
            <ScrollView
              style={{backgroundColor: 'white'}}
              stickyHeaderIndices={[]}>
              {comments?.length > 0 ? (
                comments.map((cmt, idx) => (
                  <Comment
                    key={idx}
                    user={cmt.username}
                    content={cmt.content}
                    avatar={cmt.avatar}
                    createdAt={cmt.createdAt}
                    idComment={cmt?.id}
                    handleDeleteComment={handleDeleteComment}
                    setContent={setContent}
                    setIdToEdit={setIdToEdit}
                    belongToUser={cmt.belongToUser}
                  />
                ))
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 600,
                  }}>
                  <Text style={{color: 'black', textAlign: 'center'}}>
                    No comments
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your comment here"
              placeholderTextColor="gray"
              value={content}
              onChangeText={text => setContent(text)}
            />
            {idToEdit ? (
              <TouchableOpacity
                onPress={handleEditComment}
                style={styles.sendButton}>
                <Icon name="send" style={{color: 'white'}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleAddComment}
                style={styles.sendButton}>
                <Icon name="send" style={{color: 'white'}} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderTopColor: 'lightgray',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListComments;
