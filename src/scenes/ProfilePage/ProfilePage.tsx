import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-paper';
import {posts} from '../../data/post';
import Post from '../../containers/Post/Post';
import styles from './ProfilePage.style';

const Profile = ({navigation}) => {
  const userPictureUrl =
    'https://icon-library.com/images/default-profile-icon/default-profile-icon-5.jpg';
  const userName = 'John Doe';
  const numberOfPosts = 30;
  const totalLikes = 500;
  const commentsReceived = 100;

  const dateOfBirth = 'January 1, 1990';
  const email = 'john.doe@example.com';
  const major = 'Computer Science';
  const phoneNumber = '123-456-7890';

  const showScreenListComment = postId => {
    navigation.navigate('ListCommentsScreen', {postId});
  };

  const handleAddPost = () => {
    navigation.navigate('Forum', {screen: 'AddPostScreen'});
  };

  const handleEditProfile = () => {
    navigation.navigate('EditScreen');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.background} />
          <Image source={{uri: userPictureUrl}} style={styles.userPicture} />
          <Text style={styles.userName}>{userName}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Posts</Text>
              <Text style={styles.infoText}>{numberOfPosts}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Likes</Text>
              <Text style={styles.infoText}>{totalLikes}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Comments</Text>
              <Text style={styles.infoText}>{commentsReceived}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoCardLabel}>Date of Birth:</Text>
            <Text style={styles.infoCardText}>{dateOfBirth}</Text>

            <Text style={styles.infoCardLabel}>Email:</Text>
            <Text style={styles.infoCardText}>{email}</Text>

            <Text style={styles.infoCardLabel}>Major:</Text>
            <Text style={styles.infoCardText}>{major}</Text>

            <Text style={styles.infoCardLabel}>Phone Number:</Text>
            <Text style={styles.infoCardText}>{phoneNumber}</Text>
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

          <View style={styles.postsContainer}>
            {posts.map((post, index) => (
              <Post
                postId={post.id}
                user={post.user}
                avatar={post.avatar}
                createdAt={post.createdAt}
                content={post.content}
                like={post.like}
                comment={post.comment}
                key={index}
                image={post?.image}
                showScreenListComment={showScreenListComment}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="pencil"
        color="#fff"
        onPress={handleAddPost}
      />
    </View>
  );
};

export default Profile;
