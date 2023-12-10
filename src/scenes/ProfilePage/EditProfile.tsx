import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import styles from './EditProfile.style';

const EditProfile = () => {
  const [editedName, setEditedName] = useState('John Doe');
  const [editedEmail, setEditedEmail] = useState('john.doe@example.com');
  const [editedMajor, setEditedMajor] = useState('Computer Science');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('123-456-7890');
  const [selectedImage, setSelectedImage] = useState<null | Asset[]>(null);

  const navigation = useNavigation();

  const handleSaveProfile = () => {
    console.log('Profile saved:', {
      editedName,
      editedEmail,
      editedMajor,
      editedPhoneNumber,
      selectedImage,
    });
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
        setSelectedImage(response.assets || null);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Edit Profile</Text>

        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage[0]?.uri}}
              style={styles.avatarImage}
            />
          ) : (
            <Text style={styles.avatarText}>Change Avatar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
          />

          <Text style={styles.label}>Major:</Text>
          <TextInput
            style={styles.input}
            value={editedMajor}
            onChangeText={setEditedMajor}
          />

          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editedPhoneNumber}
            onChangeText={setEditedPhoneNumber}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
