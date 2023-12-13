import {ScrollView} from 'react-native';
import styles from './HomePage.style';
import Post from '../../containers/Post/Post';
import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';
import {useCallback, useEffect, useState} from 'react';
import apis from '../../apis';

function AdminPostScreen({navigation}: AdminHomePageProps) {
  const [posts, setPosts] = useState([]);

  const fetchUsers = useCallback(async () => {
    await apis.admin.getListPost().then(res => setPosts(res?.data));
  }, [setPosts]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar />
      {posts.map((post, index) => (
        <Post
          postId={post._id}
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
