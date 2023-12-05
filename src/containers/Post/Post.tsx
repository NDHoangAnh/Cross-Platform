import {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './Post.style';

function Post({
  postId,
  user,
  avatar,
  createdAt,
  content,
  like,
  comment,
  image,
  showScreenListComment,
}) {
  const [likeCount, setLikeCount] = useState(like);
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  // image modal
  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  // action
  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

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

      <View>
        {image && (
          <TouchableOpacity onPress={toggleImageModal}>
            <Image
              resizeMode="cover"
              resizeMethod="auto"
              source={{uri: image}}
              style={styles.imagePost}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.content}>{content}</Text>
      </View>

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
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={() => showScreenListComment(postId)}>
          <Icon name="comment" style={styles.icon} />
          <Text style={styles.actionText}>{comment} Comment</Text>
        </TouchableOpacity>
        <View style={styles.actionContainer}>
          <Icon name="share" style={styles.icon} />
          <Text style={styles.actionText}>Share</Text>
        </View>
      </View>

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.modalButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReport} style={styles.modalButton}>
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal image */}
      <Modal isVisible={isImageModalVisible} onBackdropPress={toggleImageModal}>
        <View
          style={{
            // flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={{uri: image}}
            style={{width: '100%', height: '70%'}}
          />
        </View>
      </Modal>
    </View>
  );
}

export default Post;
