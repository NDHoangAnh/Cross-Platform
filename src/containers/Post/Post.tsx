import {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import styles from './Post.style';
import apis from '../../apis';
interface PostProps {
  postId: number;
  isApproved?: boolean;
  user: string;
  avatar: string;
  createdAt: string;
  content: string;
  like: number;
  comment: number;
  image?: string;
  render?: () => void;
  showScreenListComment?: (postId: number) => void;
}

function Post({
  postId,
  isApproved,
  user,
  avatar,
  createdAt,
  content,
  like,
  comment,
  image,
  render,
  showScreenListComment,
}: PostProps) {
  let isAdmin = true;
  const [likeCount, setLikeCount] = useState(like);
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isShowModalApprove, setIsShowModalApprove] = useState(false);
  const [isShowModalDecline, setIsShowModalDecline] = useState(false);

  const toggleModalApprove = () => {
    setIsShowModalApprove(!isShowModalApprove);
  };
  const toggleModalDecline = () => {
    setIsShowModalDecline(!isShowModalApprove);
  };

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
            <Text style={styles.actionText}>{comment} Comment</Text>
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

      {!isApproved && !isAdmin && (
        <View style={styles.actionsContainer}>
          <Text style={styles.approveText}>
            The article is waiting for approval
          </Text>
        </View>
      )}

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
      {isShowModalApprove && (
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
      )}

      {isShowModalDecline && (
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
      )}
    </View>
  );
}

export default Post;
