import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import styles from './EditProfile.style';
import {useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../apis';
import Toast from 'react-native-toast-message';

type UserData = {
  id: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  avatar: string | null;
  birthDate: Date | null;
  address: string | null;
  phone: string | null;
};

const EditProfile = ({navigation}) => {
  const route = useRoute();
  const {userData}: {userData?: UserData} = route.params || {};
  const [loading, setLoading] = useState(true);

  const [editedName, setEditedName] = useState(userData?.username || '');
  const [editedEmail, setEditedEmail] = useState(userData?.email || '');
  const [editedAddress, setEditedAddress] = useState(userData?.address || '');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    userData?.phone || ''
  );
  const [selectedImage, setSelectedImage] = useState<null | Asset[]>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    // Update form fields if userData changes
    setEditedName(userData?.username || '');
    setEditedEmail(userData?.email || '');
    setEditedAddress(userData?.address || '');
    setEditedPhoneNumber(userData?.phone || '');
    setLoading(false);
    const birthDate = userData?.birthDate ? new Date(userData.birthDate) : null;
    setDate(birthDate);
  }, [userData]);

  const handleSaveProfile = async () => {
    setLoad(true);
    let data;

    if (selectedImage !== null) {
      const result = await api.cloudinary.uploadImage(selectedImage);
      data = {
        username: editedName,
        email: editedEmail,
        birthDate: date,
        avatar: result,
        address: editedAddress,
        phone: editedPhoneNumber,
      };
    } else {
      data = {
        username: editedName,
        email: editedEmail,
        birthDate: date,
        address: editedAddress,
        phone: editedPhoneNumber,
      };
    }

    const response = await api.user.updateUserData(data);
    if (response?.errMsg !== undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `${response?.errMsg}`,
      });
    } else {
      navigation.goBack();
    }
    setLoad(false);
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

  if (loading) {
    // Return a loading indicator or any other appropriate UI
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Toast />
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

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={editedAddress}
            onChangeText={setEditedAddress}
          />

          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={editedPhoneNumber}
            onChangeText={setEditedPhoneNumber}
          />

          <View style={styles.birthDateContainer}>
            <Text style={styles.label}>Birth Date:</Text>

            <TouchableOpacity
              style={styles.chooseDateButton}
              onPress={() => setDatePickerVisibility(true)}>
              <Text style={styles.chooseDateButtonText}>Choose date</Text>
            </TouchableOpacity>

            {isDatePickerVisible && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDatePickerVisibility(false);
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
          <Text style={styles.label}>
            {date instanceof Date
              ? date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'No Date Selected'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveProfile}
          disabled={load}>
          {load ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Save Profile</Text>
          )}
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../../public/edit-profile.png')}
        style={styles.image}
      />
      <Image
        source={require('../../../public/edit-profile.png')}
        style={styles.imageTop}
      />
    </ScrollView>
  );
};

export default EditProfile;
