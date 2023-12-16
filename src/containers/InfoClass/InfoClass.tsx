import {Image, ScrollView, View, Text} from 'react-native';
import styles from './InfoClass.style';

function InfoClass({infoClass}) {
  const startTime = infoClass
    ? new Date(infoClass.startDate).toLocaleTimeString()
    : '';
  const endTime = infoClass
    ? new Date(infoClass.endDate).toLocaleTimeString()
    : '';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={[styles.headerText]}>Class Information</Text>
        <View style={styles.infoContent}>
          <View style={styles.column}>
            <Text style={styles.blackText}>Class Name:</Text>
            <Text style={styles.blackText}>Code:</Text>
            <Text style={styles.blackText}>Teacher:</Text>
            <Text style={styles.blackText}>Email:</Text>
            <Text style={styles.blackText}>Start time:</Text>
            <Text style={styles.blackText}>End Time:</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.blackText}>{infoClass?.name}</Text>
            <Text style={styles.blackText}>123456</Text>
            <Text style={styles.blackText}>
              {infoClass?.teacherId?.username}
            </Text>
            <Text style={styles.blackText}>
              {infoClass?.teacherId?.username}
            </Text>
            <Text style={styles.blackText}>{startTime}</Text>
            <Text style={styles.blackText}>{endTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.studentsBox}>
        <Text style={[styles.headerText]}>Students</Text>
        {infoClass?.studentId?.map((student, idx) => (
          <View key={idx} style={styles.studentItem}>
            <Image source={{uri: student.avatar}} style={styles.avatar} />
            <Text style={styles.blackText}>{student.username}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default InfoClass;
