import {ActivityIndicator, ScrollView} from 'react-native';
import {useCallback, useState} from 'react';
import Post from '../../containers/Post/Post';
import styles from './Forum.style';
import Navbar from '../../components/Navbar';
import {ForumProps} from '../../navigate';
import apis from '../../apis';
import asyncData from '../../config/auth';
import {useFocusEffect} from '@react-navigation/native';

type PostData = {
  id: string | null;
  image: string | null;
  user: string | null;
  avatar: string | null;
  content: string | null;
  like: [string] | null;
  likedByUser: boolean;
  share: number;
  createdAt: Date | null;
  belongToUser: boolean | null;
};

function Forum({navigation}: ForumProps) {
  const [listPostForum, setListPostForum] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetForumPost = async () => {
    try {
      const currentUser = await asyncData.getData();

      const data = await apis.forum.getPostOfForum();
      if (data !== null && Array.isArray(data)) {
        const listPost: PostData[] = data.map(item => ({
          id: item?._id,
          content: item?.content || null,
          image: item?.imageUrl || null,
          user: item?.senderId?.username || null,
          avatar: item?.senderId?.avatar || null,
          like: item?.like || null,
          likedByUser: item?.like?.includes(currentUser?.id) || false,
          share: item?.share || null,
          createdAt: item?.createdAt || null,
          belongToUser: item?._id === currentUser?.id || null,
        }));
        setListPostForum(listPost);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showScreenAddPost = () => {
    navigation.navigate('AddPostScreen');
  };

  const showScreenListComment = postId => {
    navigation.navigate('ListCommentsScreen', {postId});
  };

  useFocusEffect(
    useCallback(() => {
      handleGetForumPost();
    }, [])
  );

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <>
          <Navbar
            listAction={[{onPress: showScreenAddPost, name: 'Add Post'}]}
          />
          {listPostForum.map((post, index) => (
            <Post
              postId={post?.id}
              user={post?.user}
              avatar={post?.avatar}
              createdAt={post?.createdAt}
              content={post?.content}
              like={post?.like}
              key={index}
              image={post?.image}
              showScreenListComment={showScreenListComment}
              listPostForum={listPostForum}
              setListPostForum={setListPostForum}
              belongToUser={post?.belongToUser}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}

export default Forum;
