import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {eachDayOfInterval, format} from 'date-fns';
import Octicons from 'react-native-vector-icons/Octicons';
// import {useNavigation, useRoute} from '@react-navigation/native';
import ScheduleItem from '../../components/ScheduleItem';
import asyncData from '../../config/auth';
import apis from '../../apis';

export default function HomeScreen({navigation, route}): React.JSX.Element {
  // const navigation = useNavigation();
  // const route = useRoute();
  const [items, setItems] = React.useState<{[key: string]: any}>();
  const [selectedDay, setSelectedDay] = React.useState<string>(
    String(new Date())
  );

  React.useEffect(() => {
    const getDataPlan = async () => {
      const user = await asyncData.getData();
      console.log(user?.email);

      const response = await apis.schedule.getListScheduleForUser(user?.id);
      const plans = response.plans;

      const mappedData = plans.map((plan: any) => {
        const {startTime, endTime} = plan;
        const dateRange = eachDayOfInterval({
          start: new Date(startTime),
          end: new Date(endTime),
        });

        return {
          ...plan,
          email: user?.email ?? 'A',
          dateRange: dateRange.map(date => format(date, 'yyyy-MM-dd')),
        };
      });

      const reduced = mappedData.reduce((acc: any, currentItem: any) => {
        currentItem.dateRange.forEach(date => {
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push({...currentItem});
        });

        return acc;
      }, {});

      setItems(reduced);
      setSelectedDay(String(new Date()));
    };

    getDataPlan();
  }, [route.params?.item]);

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={selectedDay}
        onDayPress={day => {
          setSelectedDay(day.dateString);
        }}
        renderEmptyData={() => (
          <ScheduleItem
            item={null}
            navigation={navigation}
            isDefaultItem={true}
          />
        )}
        renderItem={(item, firstItemInDay) => (
          <ScheduleItem
            item={item}
            navigation={navigation}
            isDefaultItem={firstItemInDay && !item}
          />
        )}
      />
      <TouchableHighlight
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddScreen')}>
        <Octicons name="plus" size={50} color={'cadetblue'} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    position: 'absolute',
    bottom: 24,
    right: 12,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    textAlign: 'center',
    borderColor: 'rgba(95 158 160 / 0.3)',
    borderWidth: 1,
  },
  notScheduleText: {
    color: 'red', // Chọn màu sắc tùy ý
    fontSize: 16, // Đặt kích thước phù hợp
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
