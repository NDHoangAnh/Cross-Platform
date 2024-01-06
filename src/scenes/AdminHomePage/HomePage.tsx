import {ScrollView, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';
import User from './User';
import apis from '../../apis';

function AdminHomePage({navigation}: AdminHomePageProps) {
  const [users, setUsers] = useState([]);
  const [isRender, setIsRender] = useState(true);

  // const showScreenApprovePosts = () => {
  //   navigation.navigate('HomePagePostScreen');
  // };

  const fetchUsers = useCallback(async () => {
    await apis.admin.getUser().then(res => setUsers(res?.data));
  }, [setUsers]);

  useEffect(() => {
    if (isRender) {
      fetchUsers();
      setIsRender(false);
    }
  }, [isRender, fetchUsers]);

  return (
    <View style={{flex: 1}}>
      <Navbar />
      <ScrollView stickyHeaderIndices={[]}>
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <User
              key={index}
              userId={user?._id}
              role={user?.role}
              username={user?.username}
              avatar={user?.avatar}
              render={() => setIsRender(true)}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default AdminHomePage;
