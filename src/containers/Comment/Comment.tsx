import {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import styles from './Comment.style';
import {convertDateToDay, convertDateToHour} from '../../utils';

function Comment({
  user,
  avatar,
  content,
  createdAt,
  idComment,
  belongToUser,
  handleDeleteComment,
  setContent,
  setIdToEdit,
}) {
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const day = convertDateToDay(createdAt);
  const time = convertDateToHour(createdAt);
  const toggleModal = () => {
    setIsShowModalComment(!isShowModalComment);
  };

  const handleEdit = () => {
    toggleModal();
    setIdToEdit(idComment);
    setContent(content);
  };

  const handleDelete = async () => {
    await handleDeleteComment(idComment);
    toggleModal();
  };

  return (
    <View style={styles.commentContainer}>
      <Image
        source={{
          uri:
            avatar || 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
        }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{user}</Text>
        <Text style={styles.commentText}>{content}</Text>
        <Text style={styles.createdAt}>
          {time}
          {'\t'} {day}
        </Text>
      </View>
      {belongToUser && (
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="options" style={{fontSize: 20, color: 'black'}} />
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        isVisible={isShowModalComment}
        onBackdropPress={toggleModal}>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={[styles.blueText]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={[styles.redText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default Comment;
