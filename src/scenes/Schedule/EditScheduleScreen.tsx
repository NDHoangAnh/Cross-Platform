import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

export default function EditScheduleScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = React.useState('Hoc tieng anh');
  const [note, setNote] = React.useState('hoc nhieu vao');
  const [isFullDay, setIsFullDay] = React.useState(false);
  const [startTime, setStartTime] = React.useState('00:00');
  const [endTime, setEndTime] = React.useState('00:00');
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [isStartPickerVisible, setIsStartPickerVisible] = React.useState(false);
  const [isEndPickerVisible, setIsEndPickerVisible] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState('today');

  const item = route.params?.item;

  const onDayPress = (day: any) => {
    const formattedDate = day
      ? format(new Date(day.dateString), 'eeee, do MMMM, yyyy')
      : '00:00';
    setSelectedDay(formattedDate);
    setIsDatePickerVisible(false);
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
    setStartTime(format(time, 'HH:mm'));
    hideStartPicker();
  };

  const handleEndConfirm = (time: any) => {
    setEndTime(format(time, 'HH:mm'));
    hideEndPicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textBar}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.textBar}>Xong</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textHeader}
        value={title}
        onChangeText={newText => setTitle(newText)}
      />
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons name="notes" size={30} />
        </View>
        <TextInput
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
          <View>
            <Text style={styles.textNote}>Cả ngày</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isFullDay ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsFullDay(!isFullDay)}
            value={isFullDay}
          />
        </View>
      </View>
      <View style={styles.rowDay}>
        <View>
          <Text
            style={styles.textDate}
            onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}>
            {selectedDay}
          </Text>
        </View>
      </View>
      <View style={styles.selectDay}>
        {isDatePickerVisible && (
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDay]: {
                selected: true,
                selectedColor: 'blue',
              },
            }}
          />
        )}
      </View>
      {!isFullDay && (
        <View style={styles.rowDate}>
          <Text style={styles.textDate} onPress={showStartPicker}>
            {startTime}
          </Text>
          <Text>
            <Octicons name="dash" size={30} />
          </Text>
          <Text style={styles.textDate} onPress={showEndPicker}>
            {endTime}
          </Text>
        </View>
      )}
      <View style={styles.row}>
        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="time"
          onConfirm={handleStartConfirm}
          onCancel={hideStartPicker}
        />
        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="time"
          onConfirm={handleEndConfirm}
          onCancel={hideEndPicker}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.iconNoteCover}>
          <FontAwesome name="repeat" size={30} />
        </View>
        <Text style={styles.textRepeat}>Lặp lại hàng tuần</Text>
      </View>
      <View style={styles.rowTask}>
        <View style={styles.iconNoteCover}>
          <FontAwesome name="list-ul" size={30} />
        </View>
        <Text style={styles.textRepeat}>Việc cần làm của tôi</Text>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginStart: 60,
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
