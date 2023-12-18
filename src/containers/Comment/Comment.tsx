import {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {convertDateToDay, convertDateToHour} from '../../utils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
      <Image source={{uri: avatar}} style={styles.avatar} />
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
      <Modal isVisible={isShowModalComment} onBackdropPress={toggleModal}>
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

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 8,
    margin: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  commentText: {
    color: 'black',
  },
  createdAt: {
    marginTop: 10,
    color: 'gray',
    fontSize: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    borderColor: 'lightcoral',
    borderWidth: 1,
  },
  blueText: {
    color: 'blue',
  },
  redText: {
    color: 'red',
  },
});
export default Comment;
