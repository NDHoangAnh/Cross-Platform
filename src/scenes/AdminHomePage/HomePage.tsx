import {ScrollView, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import User from './User';
import apis from '../../apis';
import Toast from 'react-native-toast-message';

type UserData = {
  _id: number;
  username: string;
  role: string;
  avatar: string;
};

function AdminHomePage() {
  const [users, setUsers] = useState([]);
  const [isRender, setIsRender] = useState(true);
  const [message, setMessage] = useState(undefined);

  const fetchUsers = useCallback(async () => {
    await apis.admin.getUser().then(res => setUsers(res?.data));
  }, [setUsers]);

  useEffect(() => {
    if (isRender) {
      fetchUsers();
      setIsRender(false);
    }
    if (message) {
      Toast.show(message);
    }
  }, [isRender, fetchUsers, message]);

  return (
    <View style={{flex: 1}}>
      <Navbar showBackButton={false} />
      <ScrollView stickyHeaderIndices={[]}>
        {users &&
          users.length > 0 &&
          users.map((user: UserData, index) => (
            <User
              key={index}
              userId={user?._id}
              role={user?.role}
              username={user?.username}
              avatar={user?.avatar}
              render={() => setIsRender(true)}
              setMessage={setMessage}
            />
          ))}
        <Toast />
      </ScrollView>
    </View>
  );
}

export default AdminHomePage;
