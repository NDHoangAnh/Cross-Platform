import {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, parse} from 'date-fns';
import Toast from 'react-native-toast-message';
import apis from '../../apis';
import Navbar from '../../components/Navbar';
import styles from './AddActivityScene.style';
import {formatDate} from '../../utils';

function EditClassScreen({navigation, route}) {
  const {infoClass, classId} = route.params;
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(infoClass?.name);
  const [startTime, setStartTime] = useState(formatDate(infoClass?.startTime));
  const [endTime, setEndTime] = useState(formatDate(infoClass?.endTime));
  const [showDateStartPicker, setShowDateStartPicker] = useState(false);
  const [showDateEndPicker, setShowDateEndPicker] = useState(false);

  const handleDateStartChange = _time => {
    setStartTime(format(_time, 'HH:mm - dd / MMMM / yyyy'));
    setShowDateStartPicker(false);
  };
  const handleDateEndChange = _time => {
    setEndTime(format(_time, 'HH:mm - dd / MMMM / yyyy'));
    setShowDateEndPicker(false);
  };

  const handleAddClass = async () => {
    try {
      setLoading(true);
      const data = await apis.klass.editClass({
        classId,
        name: className,
        startTime: parse(startTime, 'HH:mm - dd / MMMM / yyyy', new Date()),
        endTime: parse(endTime, 'HH:mm - dd / MMMM / yyyy', new Date()),
      });

      if (data.errMsg !== undefined) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: `${data?.errMsg}`,
        });
      } else if (
        data !== null &&
        data?.errMsg === undefined &&
        typeof data === 'object'
      ) {
        setClassName('');
        setStartTime('');
        setEndTime('');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Edit class successfully',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Navbar listAction={[]} />
      <ScrollView style={{backgroundColor: 'white'}} stickyHeaderIndices={[]}>
        <View>
          <Text style={styles.title}>Add Class</Text>
          <View>
            <TextInput
              style={styles.input}
              value={className}
              onChangeText={text => setClassName(text)}
              placeholder="Enter name"
              placeholderTextColor={'gray'}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setShowDateStartPicker(true)}
              style={styles.chooseDateButton}>
              <Text style={styles.textDate}>Choose start time</Text>
              <Text
                style={styles.resultDate}
                onPress={() => setShowDateStartPicker(true)}>
                {startTime}
              </Text>
            </TouchableOpacity>
            {showDateStartPicker && (
              <DateTimePickerModal
                isVisible={showDateStartPicker}
                mode="datetime"
                onConfirm={handleDateStartChange}
                onCancel={() => setShowDateStartPicker(false)}
              />
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setShowDateEndPicker(true)}
              style={styles.chooseDateButton}>
              <Text style={styles.textDate}>Choose time</Text>
              <Text
                style={styles.resultDate}
                onPress={() => setShowDateEndPicker(true)}>
                {endTime}
              </Text>
            </TouchableOpacity>
            {showDateEndPicker && (
              <DateTimePickerModal
                isVisible={showDateEndPicker}
                mode="datetime"
                onConfirm={handleDateEndChange}
                onCancel={() => setShowDateEndPicker(false)}
              />
            )}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleAddClass}>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <View style={styles.btnAdd}>
                  <Text style={styles.btnAddText}>Submit</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </ScrollView>
    </View>
  );
}

export default EditClassScreen;
