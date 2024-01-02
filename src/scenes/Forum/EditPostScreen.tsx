import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import Navbar from '../../components/Navbar';
import styles from './EditPostScreen.style';
import Modal from 'react-native-modal';
// import {ForumProps} from '../../navigate';
// import asyncData from '../../config/auth';
import apis from '../../apis';

const EditPostScreen = ({navigation, route}) => {
  const {postId, user, avatar, content, image} = route.params;
  const initialSelectedImage = image ? [{uri: image}] : null;

  const [contentUpdate, setContentUpdate] = useState(content);
  const [selectedImage, setSelectedImage] = useState<null | Asset[]>(
    initialSelectedImage
  );
  const [isShowModalEditPost, setIsShowModalEditPost] = useState(false);

  const toggleModalEditPost = () => {
    setIsShowModalEditPost(!isShowModalEditPost);
  };

  const handleEditPost = async () => {
    try {
      if (content.trim() !== '') {
        let data;
        if (selectedImage !== null) {
          const result = await apis.cloudinary.uploadImage(selectedImage);

          data = {
            content: contentUpdate,
            imageUrl: result,
          };
        } else {
          data = {
            content: contentUpdate,
          };
        }

        await apis.forum.editPost(postId, data);
        setContentUpdate('');
        setSelectedImage(null);
        navigation.navigate('ForumScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = () => {
    const options: any = {
      mediaType: 'photo',
      title: 'Select Image',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        setSelectedImage(response.assets || null);
      }
    });
  };

  const deleteImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}} stickyHeaderIndices={[0]}>
      <Navbar listAction={[{onPress: toggleModalEditPost, name: 'EDIT'}]} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                avatar ||
                'https://avatars.githubusercontent.com/u/74105921?v=4',
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user}</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={15}
            value={contentUpdate}
            onChangeText={text => setContentUpdate(text)}
          />
        </View>

        {/* Image Picker Section */}
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.imagePickerText}>Select Image</Text>
        </TouchableOpacity>

        {selectedImage &&
          Array.isArray(selectedImage) &&
          selectedImage.length > 0 && (
            <View>
              <Image
                source={{uri: selectedImage[0].uri}}
                style={styles.selectedImage}
              />
              <TouchableOpacity onPress={deleteImage}>
                <Text style={styles.deleteButton}>Delete Image</Text>
              </TouchableOpacity>
            </View>
          )}

        {isShowModalEditPost && (
          <Modal
            isVisible={isShowModalEditPost}
            onBackdropPress={toggleModalEditPost}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Are you sure to edit this post ?
              </Text>
              <View style={styles.modalAction}>
                <TouchableOpacity onPress={toggleModalEditPost}>
                  <Text style={styles.disagreeAction}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditPost}>
                  <Text style={styles.agreeAction}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
};

export default EditPostScreen;
