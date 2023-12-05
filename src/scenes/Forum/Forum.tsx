import {ScrollView} from 'react-native';
import {posts} from '../../data/post';
import Post from '../../containers/Post/Post';
import styles from './Forum.style';
import Navbar from '../../components/Navbar';
import {ForumProps} from '../../navigate';

function Forum({navigation}: ForumProps) {
  const showScreenAddPost = () => {
    navigation.navigate('AddPostScreen');
  };

  const showScreenListComment = postId => {
    navigation.navigate('ListCommentsScreen', {postId});
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar action={showScreenAddPost} actionName={'Add Post'} />
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
    </ScrollView>
  );
}

export default Forum;
