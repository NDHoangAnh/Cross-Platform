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
import {ForumProps} from '../../navigate';

const AddPostScreen = ({navigation}: ForumProps) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<null | Asset[]>(null);
  const [isShowModalAddPost, setIsShowModalAddPost] = useState(false);

  const toggleModal = () => {
    setIsShowModalAddPost(!isShowModalAddPost);
  };

  const addPost = () => {
    navigation.navigate('ForumScreen');
  };

  const pickImage = () => {
    const options: any = {
      mediaType: 'photo',
      title: 'Select Image',
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
        // Set the selected image URI
        setSelectedImage(response.assets || null);
        console.log(response.assets);
      }
    });
  };

  const deleteImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}} stickyHeaderIndices={[0]}>
      <Navbar action={toggleModal} actionName={'POST'} />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/74105921?v=4',
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>John Doe</Text>
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
          <Modal isVisible={isShowModalAddPost} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Are you sure to publish this post to forum?
              </Text>
              <View style={styles.modalAction}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.disagreeAction}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addPost}>
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
