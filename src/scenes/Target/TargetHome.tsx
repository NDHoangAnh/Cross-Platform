import React from "react";
import {FlatList, Text, View} from "react-native";
import Navbar from "../../components/Navbar";
import styles from './index.style'
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
type ChildTarget = Omit<TargetType, 'childTarget'>
type TargetType = {
  name: string
  target: number,
  real_point: number
  description?: string
  childTarget: ChildTarget[]
}
const dumbData: TargetType[] = [{
  name: 'Thanh-1',
  target: 10,
  real_point: 5,
  description: 'description 1',
  childTarget: [{
    name: 'Thanh-child-1',
    target: 10,
    real_point: 6,
  },{
    name: 'Thanh-child-2',
    target: 10,
    real_point: 1,
  },{
    name: 'Thanh-child-3',
    target: 10,
    real_point: 2,
  }],
}, {
  name: 'Thanh-2',
  target: 6,
  real_point: 1,
  description: 'description 2',
  childTarget: [{
    name: 'Thanh-child-1',
    target: 10,
    real_point: 6,
  },{
    name: 'Thanh-child-2',
    target: 10,
    real_point: 1,
  },{
    name: 'Thanh-child-3',
    target: 10,
    real_point: 2,
  }]
}]

type Props = {
  navigation: NativeStackNavigationProp<any, 'TargetScreen', undefined>
}
const TargetHome = ({navigation}: Props) => {
  const handleRedirectCreateTarget = () => {
    navigation.navigate('CreateTarget');
  }
  const renderItemTarget = ({item}) => {
    return <View style={styles.itemTarget}>
      <View>
        <Text style={styles.nameTarget}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
      <View>
        <Text>Target: <Text style={styles.point}>{item.target}</Text></Text>
        <Text>Current: <Text style={styles.point}>{item.real_point}</Text></Text>
      </View>
    </View>
  };
  
  return  <View style={styles.container} stickyHeaderIndices={[0]}>
    <Navbar listAction={[{onPress: () => {}, name:'Edit' },{onPress: handleRedirectCreateTarget, name:'Add' }]} />
    <FlatList
      data={dumbData}
      renderItem={renderItemTarget}
    />
  </View>
}

export default  TargetHome;
