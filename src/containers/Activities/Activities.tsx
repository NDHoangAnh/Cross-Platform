import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './Activities.style';
import {FAB} from 'react-native-paper';
import Modal from 'react-native-modal';
import {convertDateToDay, convertDateToHour} from '../../utils';

function Activities({
  activities,
  roleInClass,
  handleNavigateToAddScreen,
  handleNavigateToEditScreen,
  handleDeleteActivity,
}) {
  const [showModal, setShowModal] = useState(false);
  const [activityToHandle, setActivityToHandle] = useState(null);

  const toggleModal = activity => {
    setActivityToHandle(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActivityToHandle(null);
  };

  const handleDelete = async id => {
    await handleDeleteActivity(id);
    closeModal();
  };

  return (
    <>
      {activities && activities.length > 0 && roleInClass === 'Teacher' && (
        <ScrollView contentContainerStyle={styles.container}>
          {activities.map(act => (
            <TouchableOpacity
              key={act.id}
              onPress={() => toggleModal(act)}
              style={styles.activityItem}>
              <View style={styles.header}>
                <Text style={[styles.activityText, styles.activityTitle]}>
                  Name: {act.name}
                </Text>
                <Text style={[styles.activityText, styles.typeText]}>
                  {act?.type}
                </Text>
              </View>
              <Text style={styles.activityText}>Content: {act.content}</Text>
              <Text style={styles.activityText}>
                Time:{' '}
                {`${convertDateToHour(act.time)} ${convertDateToDay(act.time)}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {activities && activities.length > 0 && roleInClass === 'User' && (
        <ScrollView contentContainerStyle={styles.container}>
          {activities.map(act => (
            <View key={act.id} style={styles.activityItem}>
              <View style={styles.header}>
                <Text style={[styles.activityText, styles.activityTitle]}>
                  Name: {act.name}
                </Text>
                <Text style={[styles.activityText, styles.typeText]}>
                  {act?.type}
                </Text>
              </View>
              <Text style={styles.activityText}>Content: {act.content}</Text>
              <Text style={styles.activityText}>
                Time:{' '}
                {`${convertDateToHour(act.time)} ${convertDateToDay(act.time)}`}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
      {activities && activities.length === 0 && (
        <View style={styles.noActContainer}>
          <Text style={styles.noActivityText}>No activity</Text>
        </View>
      )}
      {roleInClass === 'Teacher' && (
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
      )}
      {activityToHandle && (
        <Modal
          hideModalContentWhileAnimating
          backdropTransitionOutTiming={0}
          onBackdropPress={closeModal}
          propagateSwipe={true}
          isVisible={showModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                handleNavigateToEditScreen(activityToHandle);
                closeModal();
              }}
              style={styles.editButton}>
              <Text style={styles.blueText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(activityToHandle.id)}
              style={styles.deleteButton}>
              <Text style={styles.redText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}

export default Activities;
