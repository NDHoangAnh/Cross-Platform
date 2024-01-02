import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import asyncData from '../config/auth';
import {useNavigation} from '@react-navigation/native';

export default function ButtonFunction() {
  const navigation: any = useNavigation();
  const [user, setUser] = React.useState<any>({email: 'A'});
  const handleNavigation = () => {
    navigation.navigate('Profile', {screen: 'ProfileScreen'});
  };

  useEffect(() => {
    const getData = async () => {
      const user1 = await asyncData.getData();
      setUser(user1);
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation()}>
        <Avatar.Text size={40} label={user?.email[0]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFunction: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon: {
    marginRight: 20,
  },
});
