import {ScrollView, Text, View} from 'react-native';
import styles from './Activities.style';
import {FAB} from 'react-native-paper';

function Activities({activities}) {
  return (
    <>
      {activities && activities.length > 0 && (
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
      )}
      {activities && activities.length === 0 && (
        <View style={styles.noActContainer}>
          <Text style={styles.noActivityText}>No activity</Text>
        </View>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 5,
          bottom: 16,
          backgroundColor: '#3498db',
          borderRadius: 50,
        }}
        icon="pencil"
        color="#fff"
        // onPress={toggleModalEnroll}
      />
    </>
  );
}

export default Activities;
