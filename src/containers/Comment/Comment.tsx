import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function Comment({user, avatar, content, createdAt}) {
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const toggleModal = () => {
    setIsShowModalComment(!isShowModalComment);
  };

  const handleEdit = () => {
    toggleModal();
  };

  const handleDelete = () => {
    toggleModal();
  };
  return (
    <View style={styles.commentContainer}>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <TouchableOpacity style={styles.commentContent} onPress={toggleModal}>
        <Text style={styles.userName}>{user}</Text>
        <Text style={styles.commentText}>{content}</Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal isVisible={isShowModalComment} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.modalButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete</Text>
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalButton: {
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Comment;
