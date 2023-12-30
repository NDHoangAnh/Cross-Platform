import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity, View} from 'react-native';
import {convertDateToHour, convertDateToWeekday} from '../../utils';
import styles from './Klass.style';

function Klass({
  // infoClass,
  handleShowClass,
  name,
  classId,
  startTime,
  endTime,
}) {
  const startDate = convertDateToHour(startTime);
  const endDate = convertDateToHour(endTime);
  const weekDay = convertDateToWeekday(endTime);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleShowClass(classId)}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{startDate}</Text>
        <Text style={styles.timeDivider}>|</Text>
        <Text style={styles.timeText}>{endDate}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.className}>{name}</Text>
        <Text style={styles.weekdayText}>{weekDay}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Icon name="arrow-right" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
}

export default Klass;
