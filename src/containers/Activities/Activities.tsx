import {ScrollView, Text, View} from 'react-native';
import styles from './Activities.style';

function Activities({activities}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {activities.map((act, idx) => (
        <View key={idx} style={styles.activityItem}>
          <Text style={[styles.activityText, styles.activityTitle]}>
            Name: {act.name}
          </Text>
          <Text style={styles.activityText}>Content: {act.content}</Text>
          <Text style={styles.activityText}>Time: {act.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default Activities;
