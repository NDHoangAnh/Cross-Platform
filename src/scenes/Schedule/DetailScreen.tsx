import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute } from '@react-navigation/native';
import { formatDate, formatTime } from '../../utils';
import {deletePlan} from '../../apis/schedule';
import Toast from 'react-native-toast-message';

export default function DetailScreen() : React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item ?? {};

  const handleDelete = async () => {
    try {
      const result = await deletePlan(item._id);
      if (result.msg){
        Toast.show({
          type: 'success',
          text1: 'Completed to delete',
          text2: 'You have successfully deleted it.',
        });
        navigation.navigate('HomeScreen', {item: Math.random()});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to delete',
          text2: 'Delete failed, please try again.',
        });
      }
    } catch (err){
      Toast.show({
        type: 'error',
        text1: 'Failed to delete',
        text2: 'Delete failed, please try again.',
      });
    }
  };

  const returnHome = () => {
    navigation.navigate('HomeScreen', {item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={returnHome}>
          <MaterialIcons name="close" size={32} color={'black'}/>
        </TouchableOpacity>
        <View style={styles.rowHeaderLeft}>
          <TouchableOpacity style={styles.paddingIcon} onPress={() => navigation.navigate('EditScreen', {item})}>
            <MaterialIcons name="edit" size={32} color={'black'} />
          </TouchableOpacity>
          <TouchableHighlight onPress={handleDelete}>
            <MaterialIcons name="delete-forever" size={32} color={'black'}/>
          </TouchableHighlight>
        </View>
      </View>
      <Text style={styles.textHint}>VIỆC CẦN LÀM CỦA TÔI</Text>
      <View style={styles.row}>
        <View style={styles.iconNoteCover}>
          <Text style={styles.blockText} />
        </View>
        <Text style={styles.textHeader}>{item.name}</Text>
      </View>
      <Text style={styles.textDate}>{formatTime(item.startTime)} - {formatTime(item.endTime)}</Text>
      <Text style={styles.textDate}>createdAt: {item.createdAt ? formatDate(item.createdAt) : 'Not time'}</Text>
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons color={'gray'} name="notes" size={30} />
        </View>
        <Text style={styles.textNote}>Ghi chú: {item.description ?? ''}</Text>
      </View>
      <Toast/>
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
