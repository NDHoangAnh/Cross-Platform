import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './Activities.style';
import {FAB} from 'react-native-paper';
import {convertDateToDay, convertDateToHour} from '../../utils';

function Activities({
  activities,
  handleNavigateToAddScreen,
  handleNavigateToEditScreen,
}) {
  return (
    <>
      {activities && activities.length > 0 && (
        <ScrollView contentContainerStyle={styles.container}>
          {activities.map((act, idx) => (
            <TouchableOpacity
              onPress={() => handleNavigateToEditScreen(act)}
              key={idx}
              style={styles.activityItem}>
              <Text style={[styles.activityText, styles.activityTitle]}>
                Name: {act.name}
              </Text>
              <Text style={styles.activityText}>Content: {act.content}</Text>
              <Text style={styles.activityText}>
                Time:{' '}
                {`${convertDateToHour(act.time)} ${convertDateToDay(act.time)}`}
              </Text>
            </TouchableOpacity>
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
        onPress={handleNavigateToAddScreen}
      />
    </>
  );
}

export default Activities;
