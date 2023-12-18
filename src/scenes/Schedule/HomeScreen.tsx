/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Agenda} from 'react-native-calendars';
import ScheduleItem from '../../components/ScheduleItem';
import {addDays, format} from 'date-fns';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [items, setItems] = React.useState<{[key: string]: any}>();

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      const mappedData = data.map((post: any, index: any) => {
        const date = addDays(new Date(), index);

        return {
          ...post,
          date: format(date, 'yyyy-MM-dd'),
        };
      });

      const reduced = mappedData.reduce((acc: any, currentItem: any) => {
        const {date, ...coolItem} = currentItem;
        acc[date] = [coolItem];

        return acc;
      }, {});

      setItems(reduced);
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={'2023-11-30'}
        renderItem={item => (
          <ScheduleItem item={item} navigation={navigation} />
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
});
