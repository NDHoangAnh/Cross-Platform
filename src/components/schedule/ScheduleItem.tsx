import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-paper';

export default function ScheduleItem({navigation, item}: any) : React.JSX.Element {
  return (
    <TouchableOpacity style={styles.cardCoverSchedule}
      onPress={() => navigation.navigate('DetailScreen', {item})}
    >
      <Card style={styles.cardCover}>
          <Card.Content>
            <View style={styles.cardSchedule}>
              <View style={styles.textCoverSchedule}>
                <Text style={styles.textSchedule}>10:00 AM - 10:00 PM</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textScheduleHeader}>Việc cần làm</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textScheduleNote}>Đây là một ví dụ về văn bản dài mà bạn muốn hiển thị với dấu "..." khi nó bị tràn khỏi khung. Đây là một ví dụ về văn bản dài mà bạn muốn hiển thị với dấu "..." khi nó bị tràn khỏi khung.</Text>
              </View>
              <Avatar.Text label="D" />
            </View>
          </Card.Content>
      </Card>
    </TouchableOpacity>
  );
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
    flex:1,
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
