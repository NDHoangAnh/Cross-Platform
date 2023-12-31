import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {convertDateToHour, convertDateToWeekday} from '../../utils';
import styles from './Klass.style';

function Klass({
  handleDeleteClass,
  roleInClass,
  handleShowClass,
  name,
  classId,
  startTime,
  endTime,
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = async () => {
    await handleDeleteClass(classId);
    toggleModal();
  };
  const startDate = convertDateToHour(startTime);
  const endDate = convertDateToHour(endTime);
  const weekDay = convertDateToWeekday(endTime);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleShowClass(classId, roleInClass)}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{startDate}</Text>
          <Text style={styles.timeDivider}>|</Text>
          <Text style={styles.timeText}>{endDate}</Text>
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{name}</Text>
          <Text style={styles.weekdayText}>{weekDay}</Text>
        </View>
        <View style={styles.iconContainer}>
          {roleInClass === 'User' && (
            <Icon name="arrow-right" style={styles.arrowIcon} />
          )}
          {roleInClass === 'Teacher' && (
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="delete-outline" style={styles.deleteIcon} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {showModal && (
        <Modal
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating
          isVisible={showModal}
          onBackdropPress={toggleModal}>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.noButton}>
              <Text style={styles.redText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.yesButton}>
              <Text style={styles.blueText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
}

export default Klass;
