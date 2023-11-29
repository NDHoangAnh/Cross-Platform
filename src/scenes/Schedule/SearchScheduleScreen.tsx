import React from 'react';
import {View, ScrollView} from 'react-native';
import SearchBar from '../../components/schedule/SearchBar';
import ScheduleItem from '../../components/schedule/ScheduleItem';


export default function SearchScheduleScreen({navigation} : any) : React.JSX.Element{
  return (<View>
    <SearchBar navigation={navigation}/>
    <ScrollView>
      <View>
        <ScheduleItem item={{name: '123'}} navigation={navigation} />
      </View>
    </ScrollView>
  </View>);
}
