import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Post from '../../containers/Post/Post';
import Navbar from '../../components/Navbar';
import styles from './MyPostScree.style';
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
};

type UserData = {
  avatar: string | null;
  username: string | null;
};

function MyPostScreen({navigation}) {
  const [listPostUser, setListPostUser] = useState<PostData[]>([]);
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

  const handleGetUserPost = async () => {
    try {
      const currentUser = await asyncData.getData();
      const userId = currentUser?.id;
      const data = await apis.forum.getPostOfUser(userId);
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
        }));
        setListPostUser(listPost);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async id => {
    try {
      await apis.forum.deletPost(id);
      await handleGetUserPost();
    } catch (error) {
      console.log(error);
    }
  };

  const showScreenAddPost = () => {
    navigation.navigate('Forum', {
      screen: 'AddPostScreen',
      params: {infoUser: infoUser},
    });
  };

  const showScreenListComment = postId => {
    navigation.navigate('ListCommentsScreen', {postId});
  };

  useFocusEffect(
    useCallback(() => {
      handleGetUserPost();
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
          {listPostUser && listPostUser.length > 0 && (
            <ScrollView style={styles.container} stickyHeaderIndices={[]}>
              {listPostUser.map((post, index) => (
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
                  listPostForum={listPostUser}
                  setListPostForum={setListPostUser}
                  belongToUser={true}
                  handleDeletePost={handleDeletePost}
                  render={undefined}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          )}
          {listPostUser && listPostUser.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>You dont have any post</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

export default MyPostScreen;
