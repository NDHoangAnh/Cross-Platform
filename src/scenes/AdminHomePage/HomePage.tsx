import {ScrollView} from 'react-native';

import Navbar from '../../components/Navbar';
import {AdminHomePageProps} from '../../navigate';
import User from './User';
import apis from '../../apis';
import React, {useCallback, useEffect, useState} from 'react';

function AdminHomePage({navigation}: AdminHomePageProps) {
  const [users, setUsers] = useState([]);

  const showScreenApprovePosts = () => {
    navigation.navigate('HomePagePostScreen');
  };
  const fetchUsers = useCallback(async () => {
    await apis.admin.getUser().then(res => setUsers(res?.data));
  }, [setUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Navbar
        showBackButton={false}
        listAction={[{onPress: showScreenApprovePosts, name: 'Posts'}]}
      />
      {users.map((user, index) => (
        <User
          key={index}
          userId={user?._id}
          role={user?.role}
          username={user?.username}
          avatar={user?.avatar}
        />
      ))}
    </ScrollView>
  );
}

export default AdminHomePage;
