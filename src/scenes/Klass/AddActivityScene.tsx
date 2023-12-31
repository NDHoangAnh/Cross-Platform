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
import apis from '../../apis';
import Navbar from '../../components/Navbar';
import styles from './AddActivityScene.style';
import Toast from 'react-native-toast-message';
import {format, parse} from 'date-fns';

function AddActivityScene({route, navigation}) {
  const {classId} = route.params;
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const handleDateChange = _time => {
    setTime(format(_time, 'HH:mm - dd / MMMM / yyyy'));
    setShowDatePicker(false);
  };

  const handleAddActivity = async () => {
    try {
      setLoading(true);
      const data = await apis.activity.addActivity({
        classId,
        type,
        name: activityName,
        time: parse(time, 'HH:mm - dd / MMMM / yyyy', new Date()),
        content,
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
        setActivityName('');
        setTime('');
        setType('');
        setContent('');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Add activity successfulle',
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
          <Text style={styles.title}>Add activity for your class</Text>
          <View>
            <TextInput
              style={styles.input}
              value={activityName}
              onChangeText={text => setActivityName(text)}
              placeholder="Name"
              placeholderTextColor={'gray'}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={type}
              onChangeText={text => setType(text)}
              placeholder="Enter type"
              placeholderTextColor={'gray'}
            />
          </View>
          <View>
            <TextInput
              style={styles.content}
              value={content}
              onChangeText={text => setContent(text)}
              placeholder="Enter content"
              placeholderTextColor={'gray'}
              multiline
              numberOfLines={10}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.chooseDateButton}>
              <Text style={styles.textDate}>Choose time</Text>
              <Text
                style={styles.resultDate}
                onPress={() => setShowDatePicker(true)}>
                {time}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                onConfirm={handleDateChange}
                onCancel={() => setShowDatePicker(false)}
              />
            )}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleAddActivity}>
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

export default AddActivityScene;
