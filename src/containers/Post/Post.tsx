import {useCallback, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './Post.style';
import apis from '../../apis';
import asyncData from '../../config/auth';
import {convertDateToDay, convertDateToHour} from '../../utils';
import {useFocusEffect} from '@react-navigation/native';

function Post({
  navigation,
  postId,
  isApproved,
  user,
  avatar,
  createdAt,
  content,
  like,
  likedByUser,
  image,
  render,
  belongToUser,
  showScreenListComment,
  listPostForum,
  setListPostForum,
  handleDeletePost,
}) {
  const initNumLike = like && like?.length;
  const [likeCount, setLikeCount] = useState(initNumLike);
  const [isAdmin, setIsAdmin] = useState(false);
  const [liked, setLiked] = useState(likedByUser);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isShowModalApprove, setIsShowModalApprove] = useState(false);
  const [isShowModalDecline, setIsShowModalDecline] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const user1 = await asyncData.getData();
        setIsAdmin(user1?.role === 'Admin');
      };
      getData();
    }, [])
  );

  const toggleModalApprove = () => {
    setIsShowModalApprove(!isShowModalApprove);
  };

  const toggleModalDecline = () => {
    setIsShowModalDecline(!isShowModalDecline);
  };

  const day = convertDateToDay(createdAt);
  const hour = convertDateToHour(createdAt);

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  const toggleLike = async () => {
    try {
      const currentUser = await asyncData.getData();

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEdit = () => {
    navigation.navigate('EditPostScreen', {
      postId,
      user,
      avatar,
      content,
      image,
    });
    toggleModal();
  };

  const handleDelete = async () => {
    await handleDeletePost(postId);
    toggleModal();
  };

  const toggleApprove = async () => {
    await apis.admin.approvePost(postId);
    setIsShowModalApprove(!isShowModalApprove);
    render!();
  };

  const toggleDeclines = async () => {
    await apis.admin.declinePost(postId);
    setIsShowModalDecline(!isShowModalApprove);
    render!();
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              avatar ||
              'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
          }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.createdAt}>{`${hour} ${day}`}</Text>
        </View>
        {belongToUser && (
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="ellipsis-h" style={styles.icon} />
          </TouchableOpacity>
        )}
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

      {isApproved && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={toggleLike} style={styles.actionContainer}>
            <Icon
              name={liked ? 'thumbs-up' : 'thumbs-o-up'}
              style={styles.icon}
            />
            <Text style={[styles.actionText, liked && {color: 'blue'}]}>
              {likeCount} {liked ? 'Liked' : 'Like'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => showScreenListComment!(postId)}>
            <Icon name="comment" style={styles.icon} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
          <View style={styles.actionContainer}>
            <Icon name="share" style={styles.icon} />
            <Text style={styles.actionText}>Share</Text>
          </View>
        </View>
      )}

      {!isApproved && isAdmin && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={toggleModalApprove}
            style={styles.actionContainer}>
            <Icon name={'check'} style={[styles.icon, {color: 'green'}]} />
            <Text style={[styles.actionText, {color: 'green'}]}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={toggleModalDecline}>
            <Icon name={'close'} style={[styles.icon, {color: 'red'}]} />
            <Text style={[styles.actionText, {color: 'red'}]}>Declines</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal */}
      <Modal
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.redText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Text style={styles.blueText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal image */}
      <Modal
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        isVisible={isImageModalVisible}
        onBackdropPress={toggleImageModal}>
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
            style={{width: '100%', height: '75%'}}
          />
        </View>
      </Modal>

      <Modal
        isVisible={isShowModalApprove}
        onBackdropPress={toggleModalApprove}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Are you sure to approve this post to forum?
          </Text>
          <View style={styles.modalAction}>
            <TouchableOpacity onPress={toggleModalApprove}>
              <Text style={styles.disagreeAction}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleApprove}>
              <Text style={styles.agreeAction}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isShowModalDecline}
        onBackdropPress={toggleModalDecline}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Are you sure to decline this post to forum?
          </Text>
          <View style={styles.modalAction}>
            <TouchableOpacity onPress={toggleModalDecline}>
              <Text style={styles.disagreeAction}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDeclines}>
              <Text style={styles.agreeAction}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Post;
