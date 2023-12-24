import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {formatTime} from '../utils';

export default function ScheduleItem({
  navigation,
  item,
  isDefaultItem,
}: any): React.JSX.Element {
  const comeDetail = () => {
    if (!item.isClass) {
      navigation.navigate('DetailScreen', {item});
    } else {
      navigation.navigate('Class', {
        screen: 'DetailClass',
        params: {classId: item._id},
      });
    }
  };

  if (isDefaultItem) {
    return (
      <TouchableOpacity style={styles.cardCoverSchedule}>
        <Card style={styles.cardCover}>
          <Card.Content>
            <View style={styles.cardSchedule}>
              <View style={styles.textCoverSchedule}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textScheduleHeader}>
                  No schedule on this day
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.cardCoverSchedule} onPress={comeDetail}>
        <Card style={styles.cardCover}>
          <Card.Content>
            <View style={styles.cardSchedule}>
              <View style={styles.textCoverSchedule}>
                <Text style={styles.textSchedule}>
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textScheduleHeader}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.textScheduleNote}>
                  {item.description ?? ''}
                </Text>
              </View>
              <Avatar.Text label={item.email[0]} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardCover: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  cardSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardCoverSchedule: {
    marginTop: 17,
    marginRight: 10,
  },
  textCoverSchedule: {
    flex: 1,
    marginEnd: 12,
  },
  textSchedule: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
  },
  textScheduleHeader: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginTop: 12,
    marginBottom: 8,
  },
  textScheduleNote: {
    fontSize: 14,
    color: 'grey',
  },
});
