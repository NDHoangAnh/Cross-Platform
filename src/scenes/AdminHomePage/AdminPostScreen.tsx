import {ScrollView, Text, View} from 'react-native';
import styles from './HomePage.style';
import Post from '../../containers/Post/Post';
import Navbar from '../../components/Navbar';
import {useCallback, useEffect, useState} from 'react';
import apis from '../../apis';

type PostData = {
  _id: string | null;
  image: string | null;
  senderId: {
    username: string;
    avatar: string;
  };
  user: string | null;
  avatar: string | null;
  content: string | null;
  isApproved: boolean | null;
  like: [string] | null;
  share: number;
  createdAt: Date | null;
};

function AdminPostScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isRender, setIsRender] = useState(true);

  const fetchPosts = useCallback(async () => {
    await apis.admin.getListPost().then(res => {
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
    <>
      <View style={{flex: 1}}>
        <Navbar showBackButton={false} title="Forum Management" />
        <ScrollView style={styles.container} stickyHeaderIndices={[]}>
          {posts.map((post: PostData, index) => (
            <Post
              postId={post._id}
              isApproved={post.isApproved}
              user={post.senderId.username}
              avatar={post.senderId.avatar}
              createdAt={post.createdAt}
              content={post.content}
              like={post.like}
              likedByUser={undefined}
              key={index}
              image={post?.image}
              render={() => setIsRender(true)}
              navigation={undefined}
              belongToUser={undefined}
              showScreenListComment={undefined}
              listPostForum={undefined}
              setListPostForum={undefined}
              handleDeletePost={undefined}
            />
          ))}
          {posts && posts.length === 0 && (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundPostText}>No any new post</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

export default AdminPostScreen;
