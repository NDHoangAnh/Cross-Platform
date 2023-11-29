import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetailScheduleScreen() : React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();

  const item = route.params?.item;
  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={32} color={'black'}/>
        </TouchableOpacity>
        <View style={styles.rowHeaderLeft}>
          <TouchableOpacity style={styles.paddingIcon} onPress={() => navigation.navigate('EditScreen', {item})}>
            <MaterialIcons name="edit" size={32} color={'black'} />
          </TouchableOpacity>
          <TouchableHighlight>
            <MaterialIcons name="delete-forever" size={32} color={'black'}/>
          </TouchableHighlight>
        </View>
      </View>
      <Text style={styles.textHint}>VIỆC CẦN LÀM CỦA TÔI</Text>
      <View style={styles.row}>
        <View style={styles.iconNoteCover}>
          <Text style={styles.blockText} />
        </View>
        <Text style={styles.textHeader}>Học tiếng anh</Text>
      </View>
      <Text style={styles.textDate}>7:30 PM - 9:30 PM</Text>
      <Text style={styles.textDate}>Thứ Hai, 27 thg 11</Text>
      <Text style={styles.textDate}>Lặp lại hàng tuần</Text>
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons name="notes" size={30} />
        </View>
        <Text style={styles.textNote}>Ghi chú: Học nhiều</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  rowHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingIcon: {
    paddingRight: 24, 
  },
  rowNote: {
    flexDirection: 'row',
    marginTop: 16,
    marginEnd: 24,
  },
  blockText: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: 'purple',
  },
  iconNoteCover:{
    width:60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textHint: {
    fontSize: 14,
    color: 'grey',
    marginStart: 60,
    fontWeight: '500',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  textDate: {
    fontSize: 16,
    marginBottom: 4,
    marginStart: 60,
    color: 'black',
  },
  textNote: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});
