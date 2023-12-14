import {ScrollView} from 'react-native';
import Comment from '../../containers/Comment/Comment';
import {posts} from '../../data/post';
import Navbar from '../../components/Navbar';

function ListComments({route}) {
  const {postId} = route.params;
  const post = posts.find(item => item.id === postId);
  const listComments = post?.comments;

  return (
    <ScrollView style={{backgroundColor: 'white'}} stickyHeaderIndices={[0]}>
      <Navbar listAction={[]} />
      {listComments?.map((cmt, idx) => (
        <Comment
          key={idx}
          user={cmt.user}
          content={cmt.content}
          avatar={cmt.avatar}
          createdAt={cmt.createdAt}
        />
      ))}
    </ScrollView>
  );
}

export default ListComments;
