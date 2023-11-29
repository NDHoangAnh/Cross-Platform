import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ButtonFunction() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* TouchableOpacity for search icon */}
      <View style={styles.buttonFunction}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <FontAwesome5 name="search" size={30} style={styles.icon} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Search button pressed')}>
          <FontAwesome6 name="calendar-day" size={30} style={styles.icon} color={'black'} />
        </TouchableOpacity>
      </View>

      {/* TouchableOpacity for Avatar.Text */}
      <TouchableOpacity>
        <Avatar.Text size={40} label="D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonFunction: {
    flexDirection: 'row',
  },
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon:{
    marginRight: 20,
  },
});
