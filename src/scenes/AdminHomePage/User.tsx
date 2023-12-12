import {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './User.style';

function User({userId, isActive, username, avatar, createdAt}) {
  const [isModalVisible, setModalVisible] = useState(false);

  // additional modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEdit = () => {
    toggleModal();
  };

  const handleDelete = () => {
    toggleModal();
  };

  const handleReport = () => {
    toggleModal();
  };
  //

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{username}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
        <View style={styles.actionContainer}>
          <Icon
            name="circle"
            style={[styles.icon, isActive && styles.active]}
          />
          <Text>{isActive ? 'Active' : 'Deactive'}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="ellipsis-h" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.modalButton}>
            <Text style={styles.buttonText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
            <Text style={styles.buttonText}>Deactive</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReport} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default User;
