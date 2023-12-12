import {ScrollView} from 'react-native';
import styles from './HomePage.style';
import {posts} from '../../data/post';
import Post from '../../containers/Post/Post';
import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';

function AdminPostScreen({navigation}: AdminHomePageProps) {
  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar />
      {posts.map((post, index) => (
        <Post
          postId={post.id}
          isApproved={post.isApproved}
          user={post.user}
          avatar={post.avatar}
          createdAt={post.createdAt}
          content={post.content}
          like={post.like}
          comment={post.comment}
          key={index}
          image={post?.image}
        />
      ))}
    </ScrollView>
  );
}

export default AdminPostScreen;
