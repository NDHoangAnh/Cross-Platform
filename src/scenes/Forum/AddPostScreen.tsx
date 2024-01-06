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
import styles from './AddPostScree.style';
import Modal from 'react-native-modal';
// import {ForumProps} from '../../navigate';
import asyncData from '../../config/auth';
import apis from '../../apis';

const AddPostScreen = ({navigation, route}) => {
  const {infoUser} = route.params;
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<null | Asset[]>(null);
  const [isShowModalAddPost, setIsShowModalAddPost] = useState(false);

  const toggleModalAddPost = () => {
    setIsShowModalAddPost(!isShowModalAddPost);
  };

  const handleAddPost = async () => {
    try {
      if (content.trim() !== '') {
        let data;
        const user = await asyncData.getData();
        if (selectedImage !== null) {
          const result = await apis.cloudinary.uploadImage(selectedImage);
          console.log(result);

          data = {
            senderId: user?.id,
            content,
            imageUrl: result,
          };
        } else {
          data = {
            senderId: user?.id,
            content,
          };
        }

        await apis.forum.addPost(data);
        setContent('');
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
      <Navbar listAction={[{onPress: toggleModalAddPost, name: 'POST'}]} />
      <View style={styles.container}>
        <View style={styles.header}>
          {infoUser && (
            <>
              <Image
                source={{
                  uri:
                    infoUser?.avatar ||
                    'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
                }}
                style={styles.avatar}
              />
              <Text style={styles.username}>{infoUser?.username}</Text>
            </>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor="gray"
            style={styles.input}
            multiline
            numberOfLines={15}
            value={content}
            onChangeText={text => setContent(text)}
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
              {/* Delete button */}
              <TouchableOpacity onPress={deleteImage}>
                <Text style={styles.deleteButton}>Delete Image</Text>
              </TouchableOpacity>
            </View>
          )}

        {isShowModalAddPost && (
          <Modal
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating
            isVisible={isShowModalAddPost}
            onBackdropPress={toggleModalAddPost}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Are you sure to publish this post to forum?
              </Text>
              <View style={styles.modalAction}>
                <TouchableOpacity onPress={toggleModalAddPost}>
                  <Text style={styles.disagreeAction}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddPost}>
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

export default AddPostScreen;
