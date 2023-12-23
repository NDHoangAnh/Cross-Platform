/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import asyncData from '../config/auth';

export default function ButtonFunction({navigation}) {
  const [userEmail, setUserEmail] = useState('');
  const fetchData = async () => {
    try {
      const user = await asyncData.getData();
      setUserEmail(user?.email || 'A');
      console.log(userEmail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonFunction}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <FontAwesome5
            name="search"
            size={30}
            style={styles.icon}
            color={'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome6
            name="calendar-day"
            size={30}
            style={styles.icon}
            color={'black'}
          />
        </TouchableOpacity> */}
      </View>

      {/* TouchableOpacity for Avatar.Text */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProfilePage', {screen: 'ProfileScreen'})
        }>
        <Avatar.Text size={40} label={userEmail[0]} />
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
