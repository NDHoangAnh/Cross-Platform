import {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './Post.style';
import asyncData from '../../config/auth';
import apis from '../../apis';
import {convertDateToDay, convertDateToHour} from '../../utils';

function Post({
  postId,
  user,
  avatar,
  createdAt,
  content,
  like,
  image,
  showScreenListComment,
  listPostForum,
  setListPostForum,
}) {
  const [likeCount, setLikeCount] = useState(like);
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const day = convertDateToDay(createdAt);
  const hour = convertDateToHour(createdAt);

  // image modal
  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  const toggleLike = async () => {
    try {
      const currentUser = await asyncData.getData(); // Fetch current user's information

      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      } else {
        setLikeCount(likeCount + 1);
        setLiked(true);
      }

      await apis.forum.likePost(postId, currentUser?.id);

      const updatedList = listPostForum.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likedByUser: !liked,
          };
        }
        return post;
      });
      setListPostForum(updatedList);
    } catch (error) {
      console.log(error);
    }
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
          <Text style={styles.createdAt}>{`${hour} ${day}`}</Text>
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
          <Text style={styles.actionText}>Comment</Text>
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
