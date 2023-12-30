import {ScrollView} from 'react-native';
import styles from './HomePage.style';
import Post from '../../containers/Post/Post';
import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';
import {useCallback, useEffect, useState} from 'react';
import apis from '../../apis';

function AdminPostScreen({navigation}: AdminHomePageProps) {
  const [posts, setPosts] = useState([]);
  const [isRender, setIsRender] = useState(true);

  const fetchPosts = useCallback(async () => {
    await apis.admin.getListPost().then(res => {
      console.log(res?.data);
      setPosts(res?.data);
    });
  }, [setPosts]);

  useEffect(() => {
    if (isRender) {
      fetchPosts();
      setIsRender(false);
    }
  }, [isRender, fetchPosts]);

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar />
      {posts.map((post, index) => (
        <Post
          postId={post._id}
          isApproved={post.isApproved}
          user={post.senderName}
          avatar={post.senderAvatar}
          createdAt={post.createdAt}
          content={post.content}
          like={post.like}
          comment={post.comment}
          key={index}
          image={post?.image}
          render={() => setIsRender(true)}
        />
      ))}
    </ScrollView>
  );
}

export default AdminPostScreen;
