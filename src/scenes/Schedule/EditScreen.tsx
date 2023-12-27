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
import {format, parse} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import apis from '../../apis';
import {formatDate} from '../../utils';

type ErrorData = {
  title: string | null;
  note: string | null;
  startTime: string | null;
  endTime: string | null;
};

export default function EditScreen({navigation, route}): React.JSX.Element {
  let item = route.params?.item ?? {};

  const [errors, setErrors] = React.useState<ErrorData | null>(null);

  const [title, setTitle] = React.useState(item.name);
  const [note, setNote] = React.useState(item.description ?? '');
  const [startTime, setStartTime] = React.useState(formatDate(item.startTime));
  const [endTime, setEndTime] = React.useState(formatDate(item.endTime));
  const [isStartPickerVisible, setIsStartPickerVisible] = React.useState(false);
  const [isEndPickerVisible, setIsEndPickerVisible] = React.useState(false);

  const handleUpdate = async () => {
    try {
      const validate = validateForm();

      if (!validate) {
        return;
      }
      const body = {
        planId: item._id,
        name: title,
        description: note,
        startTime: parse(startTime, 'HH:mm - dd / MMMM / yyyy', new Date()),
        endTime: parse(endTime, 'HH:mm - dd / MMMM / yyyy', new Date()),
      };
      const result = await apis.schedule.updatePlan(body);
      if (result.errMsg) {
        Toast.show({
          type: 'error',
          visibilityTime: 1000,
          text1: 'Failed to update',
          text2: result.errMsg ?? 'Update failed, please try again.',
        });
      } else {
        item = {
          _id: item._id,
          ...result,
        };
        navigation.navigate('DetailScreen', {item, reRender: true});
        Toast.show({
          type: 'success',
          visibilityTime: 1000,
          text1: 'Completed to update',
          text2: 'You have successfully to update it.',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        visibilityTime: 1000,
        text1: 'Failed to update',
        text2: 'Update failed, please try again.',
      });
    }
  };

  const validateForm = () => {
    let error: ErrorData = {
      title: null,
      note: null,
      startTime: null,
      endTime: null,
    };

    if (!title) {
      error = {...error, title: 'Name of Schedule is required'};
    }
    if (!note) {
      error = {...error, note: 'Note of schedule is required'};
    }
    if (!startTime) {
      error = {...error, startTime: 'Start time is required'};
    }
    if (!endTime) {
      error = {...error, endTime: 'End time is required'};
    }
    if (startTime && endTime) {
      const start = parse(startTime, 'HH:mm - dd / MMMM / yyyy', new Date());
      const end = parse(endTime, 'HH:mm - dd / MMMM / yyyy', new Date());
      let endTimeText = '';
      if (start > end) {
        endTimeText = 'End time is greater than start time';
      }
      if (
        start.getHours() > end.getHours() ||
        (start.getHours() === end.getHours() &&
          start.getMinutes() > end.getMinutes())
      ) {
        endTimeText = 'End time is greater than start time';
      }
      if (endTimeText !== '') {
        error = {...error, endTime: endTimeText};
      }
    }

    setErrors(error);

    setErrors(error);

    return !error.title;
  };

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
    setStartTime(format(time, 'HH:mm - dd / MMMM / yyyy'));
    hideStartPicker();
  };

  const handleEndConfirm = (time: any) => {
    setEndTime(format(time, 'HH:mm - dd / MMMM / yyyy'));
    hideEndPicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textBar}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate}>
          <Text style={styles.textBar}>Xong</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textHeader}
        value={title}
        onChangeText={newText => setTitle(newText)}
      />
      {errors?.title ? (
        <Text style={styles.errorText}>{errors.title}</Text>
      ) : null}
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons color={'gray'} name="notes" size={30} />
        </View>
        <TextInput
          style={styles.textNote}
          multiline={true}
          value={note}
          onChangeText={newText => setNote(newText)}
        />
      </View>
      {errors?.note ? (
        <Text style={styles.errorText}>{errors.note}</Text>
      ) : null}
      <View style={styles.row}>
        <View style={styles.iconCover}>
          <MaterialCommunityIcons
            color={'gray'}
            name="clock-time-four-outline"
            size={30}
          />
        </View>
        <View style={styles.allDay}>
          <View style={styles.rowDate}>
            <Text onPress={showStartPicker}>Start Time :</Text>
            <Text style={styles.textDate} onPress={showStartPicker}>
              {startTime}
            </Text>
          </View>
          {errors?.startTime ? (
            <Text style={styles.errorTime}>{errors.startTime}</Text>
          ) : null}
          <View>
            <Text style={styles.rowDate}>
              <Octicons color={'gray'} name="dash" size={30} />
            </Text>
          </View>
          <View style={styles.rowDate}>
            <Text onPress={showEndPicker}>End Time :</Text>
            <Text style={styles.textDate} onPress={showEndPicker}>
              {endTime}
            </Text>
          </View>
          {errors?.endTime ? (
            <Text style={styles.errorTime}>{errors.endTime}</Text>
          ) : null}
          <DateTimePickerModal
            isVisible={isStartPickerVisible}
            mode="datetime"
            date={parse(startTime, 'HH:mm - dd,MMMM,yyyy', new Date())}
            onConfirm={handleStartConfirm}
            onCancel={hideStartPicker}
          />
          <DateTimePickerModal
            isVisible={isEndPickerVisible}
            mode="datetime"
            date={parse(endTime, 'HH:mm - dd,MMMM,yyyy', new Date())}
            onConfirm={handleEndConfirm}
            onCancel={hideEndPicker}
          />
        </View>
      </View>
      <View style={styles.rowTask}>
        <View style={styles.iconNoteCover}>
          <FontAwesome color={'gray'} name="list-ul" size={30} />
        </View>
        <Text style={styles.textRepeat}>My Schedule</Text>
      </View>
      <Toast />
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 20,
    color: 'gray',
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
  errorText: {
    marginStart: 60,
    fontSize: 12,
    color: 'red',
  },
  errorTime: {
    fontSize: 12,
    color: 'red',
  },
});
