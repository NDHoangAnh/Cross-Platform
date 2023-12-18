import React from 'react';
import {View, ScrollView} from 'react-native';
import SearchBar from '../../components/SearchBar';
import ScheduleItem from '../../components/ScheduleItem';

export default function SearchScreen({navigation}: any): React.JSX.Element {
  return (
    <View>
      <SearchBar navigation={navigation} />
      <ScrollView>
        <View>
          <ScheduleItem item={{name: '123'}} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
