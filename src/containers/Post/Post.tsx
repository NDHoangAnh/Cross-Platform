import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Post.style';

function Post({user, avatar, createdAt, content, like, comment}) {
  const [likeCount, setLikeCount] = useState(like);
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfoContainer}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="ellipsis-h" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{content}</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={toggleLike} style={styles.actionContainer}>
          <Icon
            name={liked ? 'thumbs-up' : 'thumbs-o-up'}
            style={styles.icon}
          />
          <Text style={[styles.actionText, liked && {color: 'blue'}]}>
            {likeCount} Like
          </Text>
        </TouchableOpacity>
        <View style={styles.actionContainer}>
          <Icon name="comment" style={styles.icon} />
          <Text style={styles.actionText}>{comment} Comment</Text>
        </View>
        <View style={styles.actionContainer}>
          <Icon name="share" style={styles.icon} />
          <Text style={styles.actionText}>Share</Text>
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <Text>Modal Content</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default Post;
