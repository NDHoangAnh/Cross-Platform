import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { addPlant } from '../../apis/schedule';
import asyncData from '../../config/auth';

export default function EditScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [note, setNote] = React.useState('');

  const [startTime, setStartTime] = React.useState(format(new Date(), 'HH:mm - dd,MMMM,yyyy'));
  const [endTime, setEndTime] = React.useState(format(new Date(), 'HH:mm - dd,MMMM,yyyy'));

  const [isStartPickerVisible, setIsStartPickerVisible] = React.useState(false);
  const [isEndPickerVisible, setIsEndPickerVisible] = React.useState(false);

  const showStartPicker = () => {
    setIsStartPickerVisible(true);
  };

  const hideStartPicker = () => {
    setIsStartPickerVisible(false);
  };

  const showEndPicker = () => {
    setIsEndPickerVisible(true);
  };

  const hideEndPicker = () => {
    setIsEndPickerVisible(false);
  };

  const handleStartConfirm = (time: any) => {
    setStartTime(format(time, 'HH:mm - dd,MMMM,yyyy'));
    hideStartPicker();
  };

  const handleEndConfirm = (time: any) => {
    setEndTime(format(time, 'HH:mm - dd,MMMM,yyyy'));
    hideEndPicker();
  };

  const handleAdd = async () => {
    try {
      const user = await asyncData.getData();
      const body = {
        userId: user?.id,
        name: title,
        description: note,
        startTime: parse(startTime,'HH:mm - dd,MMMM,yyyy', new Date()),
        endTime: parse(endTime,'HH:mm - dd,MMMM,yyyy', new Date()),
      };
      const result = await addPlant(body);
      console.log(body);
      console.log(result);
      if (result.errMsg){
        Toast.show({
          type: 'error',
          text1: 'Failed to update',
          text2: 'Update failed, please try again.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Completed to update',
          text2: 'You have successfully to update it.',
        });
        navigation.navigate('HomeScreen', {item: Math.random()});
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update',
        text2: 'Update failed, please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textBar}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.textBar}>Xong</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textHeader}
        placeholder="Enter your schedule name"
        value={title}
        onChangeText={newText => setTitle(newText)}
      />
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons name="notes" size={30} />
        </View>
        <TextInput
          placeholder="Enter your note"
          style={styles.textNote}
          multiline={true}
          value={note}
          onChangeText={newText => setNote(newText)}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.iconCover}>
          <MaterialCommunityIcons name="clock-time-four-outline" size={30} />
        </View>
        <View style={styles.allDay}>
        <View style={styles.rowDate}>
            <Text onPress={showStartPicker}>Start Time :</Text>
            <Text style={styles.textDate} onPress={showStartPicker}>{startTime}</Text>
          </View>
          <View>
            <Text style={styles.rowDate}>
              <Octicons name="dash" size={30}/>
            </Text>
          </View>
          <View style={styles.rowDate}>
            <Text onPress={showEndPicker}>End Time :</Text>
            <Text style={styles.textDate} onPress={showEndPicker}>{endTime}</Text>
          </View>
            <DateTimePickerModal
              isVisible={isStartPickerVisible}
              mode="datetime"
              onConfirm={handleStartConfirm}
              onCancel={hideStartPicker}
            />
            <DateTimePickerModal
              isVisible={isEndPickerVisible}
              mode= "datetime"
              onConfirm={handleEndConfirm}
              onCancel={hideEndPicker}
            />
        </View>
      </View>
      <View style={styles.rowTask}>
        <View style={styles.iconNoteCover}>
          <FontAwesome name="list-ul" size={30} />
        </View>
        <Text style={styles.textRepeat}>My Schedule</Text>
      </View>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  textBar: {
    color: 'blue',
    fontSize: 20,
  },
  rowTask: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
    borderTopWidth: 1,
    borderBlockColor: 'lightgrey',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  allDay: {
    flexDirection: 'column',
    flex: 1,
    marginEnd: 20,
    marginVertical: 12,
  },
  rowDay: {
    flexDirection: 'column',
    marginStart: 60,
    alignItems: 'flex-start',
  },
  selectDay: {
    width: '100%',
  },
  textRepeat: {
    color: 'black',
    fontSize: 16,
  },
  rowDate: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 20,
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
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 4,
    paddingEnd: 24,
    borderBlockColor: 'lightgrey',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  iconNoteCover: {
    width: 60,
    height: '100%',
    paddingTop: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconCover: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textHeader: {
    marginStart: 60,
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
  },
  textDate: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    marginStart: 0,
    color: 'black',
  },
  textNote: {
    flex: 1,
    fontSize: 20,
    color: 'black',
  },
});
