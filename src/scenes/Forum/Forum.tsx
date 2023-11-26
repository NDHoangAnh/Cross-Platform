import {ScrollView} from 'react-native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {posts} from '../../data/post';
import Post from '../../containers/Post/Post';
import styles from './Forum.style';
import Navbar from '../../components/Navbar';
import AddPostScreen from './AddPostScreen';

const ForumStack = createNativeStackNavigator();

function ForumStackScreen() {
  return (
    <ForumStack.Navigator screenOptions={{headerShown: false}}>
      <ForumStack.Screen name="Forum" component={Forum} />
      <ForumStack.Screen name="AddPostScreen" component={AddPostScreen} />
    </ForumStack.Navigator>
  );
}

type ForumProps = {
  navigation: NativeStackNavigationProp<any, 'ForumStack'>;
};

function Forum({navigation}: ForumProps) {
  const showScreenAddPost = () => {
    navigation.navigate('AddPostScreen');
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar action={showScreenAddPost} actionName={'Add Post'} />
      {posts.map((post, index) => (
        <Post
          user={post.user}
          avatar={post.avatar}
          createdAt={post.createdAt}
          content={post.content}
          like={post.like}
          comment={post.comment}
          key={index}
        />
      ))}
    </ScrollView>
  );
}

export default ForumStackScreen;
