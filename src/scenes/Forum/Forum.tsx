import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Post from '../../containers/Post/Post';
import styles from './Forum.style';
import Navbar from '../../components/Navbar';
import {ForumProps} from '../../navigate';
import apis from '../../apis';
import asyncData from '../../config/auth';

type PostData = {
  id: string | null;
  image: string | null;
  user: string | null;
  avatar: string | null;
  content: string | null;
  isApproved: boolean | null;
  like: [string] | null;
  likedByUser: boolean;
  share: number;
  createdAt: Date | null;
  belongToUser: boolean | null;
};

type UserData = {
  avatar: string | null;
  username: string | null;
};

function Forum({navigation}: ForumProps) {
  const [listPostForum, setListPostForum] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState<UserData>();

  const handleGetInfoUser = async () => {
    try {
      const user = await asyncData.getData();
      const userData = await apis.user.getUserData(user?.id);
      setInfoUser({
        avatar: userData?.avatar,
        username: userData?.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          isApproved: item?.isApproved,
          like: item?.like || null,
          likedByUser: item?.like?.includes(currentUser?.id) || false,
          share: item?.share || null,
          createdAt: item?.createdAt || null,
          belongToUser: item?.senderId?._id === currentUser?.id || null,
        }));
        setListPostForum(listPost);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async id => {
    try {
      await apis.forum.deletPost(id);
      await handleGetForumPost();
    } catch (error) {
      console.log(error);
    }
  };

  const showScreenAddPost = () => {
    navigation.navigate('AddPostScreen', {infoUser: infoUser});
  };

  const showScreenListComment = postId => {
    navigation.navigate('ListCommentsScreen', {postId});
  };

  // const showScreenEditPost = (postId, user, avatar, content, image) => {
  //   navigation.navigate('EditPostScreen', {
  //     postId,
  //     user,
  //     avatar,
  //     content,
  //     image,
  //   });
  // };

  useFocusEffect(
    useCallback(() => {
      handleGetForumPost();
      handleGetInfoUser();
    }, [])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <View style={{flex: 1}}>
          <Navbar
            listAction={[{onPress: showScreenAddPost, name: 'Add Post'}]}
          />
          <ScrollView style={styles.container} stickyHeaderIndices={[]}>
            {listPostForum.map((post, index) => (
              <Post
                postId={post?.id}
                user={post?.user}
                avatar={post?.avatar}
                createdAt={post?.createdAt}
                content={post?.content}
                isApproved={post?.isApproved}
                like={post?.like}
                likedByUser={post?.likedByUser}
                key={index}
                image={post?.image}
                showScreenListComment={showScreenListComment}
                listPostForum={listPostForum}
                setListPostForum={setListPostForum}
                belongToUser={post?.belongToUser}
                handleDeletePost={handleDeletePost}
                render={undefined}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default Forum;
