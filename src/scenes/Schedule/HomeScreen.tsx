import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {eachDayOfInterval, format} from 'date-fns';
import Octicons from 'react-native-vector-icons/Octicons';
import ScheduleItem from '../../components/ScheduleItem';
import apis from '../../apis';
import asyncData from '../../config/auth';

export default function HomeScreen({navigation, route}): React.JSX.Element {
  const [items, setItems] = useState<{[key: string]: any}>();
  const [selectedDay, setSelectedDay] = useState<string>(String(new Date()));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
      const user = await asyncData.getData();
      const response = await apis.schedule.getListScheduleForUser(user?.id);
      const plans = response.plans ?? [];
      const studyArray = response.klass ?? [];
      const studyMap = studyArray.map((study : any) => {
        return {
          ...study,
          isClass:true,
        };
      });

      const arrays = plans.concat(studyMap);

      const mappedData = arrays.map((plan : any) => {
        const { startTime, endTime } = plan;
        if (startTime && endTime) {
          const startDate = new Date(startTime);
          const endDate = new Date(endTime);
          if (startDate > endDate) {return null;}
          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) ) {
            if (plan.isClass === false){
            const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
            return {
              ...plan,
              email: user?.email ?? 'A',
              dateRange: dateRange.map(date => format(date, 'yyyy-MM-dd')),
            };
            }
            else {
              const duration = plan.duration;
              let dateRange = duration.map((time) => format(new Date(time[0]),'yyyy-MM-dd'));
              return {
                ...plan,
                email: user?.email ?? 'A',
                dateRange: dateRange,
              };
            }
          } else {
            console.error('Invalid start or end date for plan:', plan);
          }
        } else {
          console.error('startTime or endTime is undefined for plan:', plan);
        }

        return null; // or handle the case where dates are undefined or invalid
      });

      const validMappedData = mappedData.filter(item => item !== null);

      const reduced = validMappedData.reduce((acc: any, currentItem: any) => {
        currentItem.dateRange.forEach(date=> {
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(currentItem);
        });

        return acc;
      }, {});

      setItems(reduced);
      setLoading(false);
      setSelectedDay(String(new Date()));
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, [route.params?.item]);

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
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
      )}
    </>
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
    color: 'red',
    fontSize: 16,
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
