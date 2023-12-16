import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity, View} from 'react-native';
import {convertDateToHour, convertDateToWeekday} from '../../utils';
import styles from './Klass.style';

function Klass({infoClass, handleShowClass}) {
  const startTime = convertDateToHour(infoClass?.startDate);
  const endTime = convertDateToHour(infoClass?.endDate);
  const weekDay = convertDateToWeekday(infoClass?.endDate);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleShowClass(infoClass?.id)}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{startTime}</Text>
        <Text style={styles.timeDivider}>|</Text>
        <Text style={styles.timeText}>{endTime}</Text>
      </View>
      <View style={styles.classInfo}>
        <Text style={styles.className}>{infoClass?.name}</Text>
        <Text style={styles.weekdayText}>{weekDay}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Icon name="arrow-right" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
}

export default Klass;
