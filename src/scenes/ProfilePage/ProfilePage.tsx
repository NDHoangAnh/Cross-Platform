import {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import styles from './ProfilePage.style';
import asyncData from '../../config/auth';
import api from '../../apis';
import LoadingScreen from '../Loading';

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

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const userPictureUrl =
    'https://icon-library.com/images/default-profile-icon/default-profile-icon-5.jpg';

  useFocusEffect(
    useCallback(() => {
      handleGetUserData();
    }, [])
  );

  useEffect(() => {
    handleGetUserData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [userData]);

  const handleGetUserData = async () => {
    try {
      const data = await asyncData.getData();
      const user = await api.user.getUserData(data?.id);

      if (data !== null && typeof data === 'object') {
        const userProfile: UserData = {
          id: data.id,
          username: user?.username || null,
          email: data.email,
          role: data.role,
          avatar: user?.avatar || null,
          birthDate: user?.birthDate || null,
          address: user?.address || null,
          phone: user?.phone || null,
        };

        setUserData(userProfile);
        setLoadingData(false);
      } else {
        console.log('Invalid user data received');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditScreen', {userData: userData});
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen', userData?.email);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/003/127/954/non_2x/abstract-template-blue-background-white-squares-free-vector.jpg',
            }}
            style={styles.background}
          />
          <Image
            source={{uri: userData?.avatar ? userData?.avatar : userPictureUrl}}
            style={styles.userPicture}
          />
          <Text style={styles.userName}>
            {userData?.username ? userData?.username : ''}
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Date of Birth:</Text>
            <Text style={styles.infoCardText}>
              {userData?.birthDate
                ? new Date(userData.birthDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'No Date Selected'}
            </Text>

            <Text style={styles.infoCardLabel}>Email:</Text>
            <Text style={styles.infoCardText}>
              {userData?.email ? userData?.email : ''}
            </Text>

            <Text style={styles.infoCardLabel}>Address:</Text>
            <Text style={styles.infoCardText}>
              {userData?.address ? userData?.address : ''}
            </Text>

            <Text style={styles.infoCardLabel}>Phone Number:</Text>
            <Text style={styles.infoCardText}>
              {userData?.phone ? userData?.phone : ''}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
