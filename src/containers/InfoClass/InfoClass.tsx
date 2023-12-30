import {Image, ScrollView, View, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import styles from './InfoClass.style';

function InfoClass({infoClass}) {
  const startTime = infoClass
    ? new Date(infoClass.startTime).toLocaleTimeString()
    : '';
  const endTime = infoClass
    ? new Date(infoClass.endTime).toLocaleTimeString()
    : '';

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={[styles.headerText]}>Class Information</Text>
          <View style={styles.infoContent}>
            <View style={styles.columnTitle}>
              <Text style={styles.blackText}>Class Name:</Text>
              <Text style={styles.blackText}>Code:</Text>
              <Text style={styles.blackText}>Teacher:</Text>
              <Text style={styles.blackText}>Email:</Text>
              <Text style={styles.blackText}>Start time:</Text>
              <Text style={styles.blackText}>End Time:</Text>
            </View>
            <View style={styles.columnContent}>
              <Text style={styles.blackText}>{infoClass?.name}</Text>
              <Text style={styles.blackText}>{infoClass?.code}</Text>
              <Text style={styles.blackText}>{infoClass?.teacherName}</Text>
              <Text style={styles.blackText}>{infoClass?.teacherEmail}</Text>
              <Text style={styles.blackText}>{startTime}</Text>
              <Text style={styles.blackText}>{endTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.studentsBox}>
          <Text style={[styles.headerText]}>Students</Text>
          {infoClass?.students &&
            infoClass?.students?.length > 0 &&
            infoClass?.students?.map((student, idx) => (
              <View key={idx} style={styles.studentItem}>
                <Image source={{uri: student.avatar}} style={styles.avatar} />
                <Text style={styles.blackText}>{student.name}</Text>
              </View>
            ))}
          {infoClass?.students && infoClass?.students?.length === 0 && (
            <View>
              <Text style={{color: 'black'}}>No students</Text>
            </View>
          )}
        </View>
      </ScrollView>
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

export default InfoClass;
