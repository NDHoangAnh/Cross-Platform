import {users} from '../../data/user';
import {ScrollView} from 'react-native';

import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';
import User from './User';

function AdminHomePage({navigation}: AdminHomePageProps) {
  const showScreenApprovePosts = () => {
    navigation.navigate('HomePagePostScreen');
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Navbar
        showBackButton={false}
        listAction={[{onPress: showScreenApprovePosts, name: 'Posts'}]}
      />
      {users.map((user, index) => (
        <User
          key={index}
          userId={user.id}
          isActive={user.isActive}
          username={user.username}
          avatar={user.avatar}
          createdAt={user.createdAt}
        />
      ))}
    </ScrollView>
  );
}

export default AdminHomePage;
