import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {format, parse} from 'date-fns';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './AddActivityScene.style';
import Navbar from '../../components/Navbar';
import {formatDate} from '../../utils';
import apis from '../../apis';

function EditActivityScene({route, navigation}) {
  const {activity} = route.params;
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activityName, setActivityName] = useState(activity?.name);
  const [time, setTime] = useState(formatDate(activity?.time));
  const [type, setType] = useState(activity?.type);
  const [content, setContent] = useState(activity?.content);

  const handleDateChange = _time => {
    setTime(format(_time, 'HH:mm - dd / MMMM / yyyy'));
    setShowDatePicker(false);
  };

  const handleEditActivity = async () => {
    try {
      setLoading(true);
      const data = await apis.activity.editActivity({
        activityId: activity?.id,
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
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Edit activity successfully',
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
    <>
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
                onPress={handleEditActivity}>
                {loading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <View style={styles.btnAdd}>
                    <Text style={styles.btnAddText}>Edit</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <Toast />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default EditActivityScene;
