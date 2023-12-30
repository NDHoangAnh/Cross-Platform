import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Klass from '../../containers/Klass/Klass';
import Navbar from '../../components/Navbar';
import {KlassProps} from '../../navigate';
import asyncData from '../../config/auth';
import apis from '../../apis';
import styles from './ListClass.style';

type ClassData = {
  id: string | null;
  name: string | null;
  startTime: Date | null;
  endTime: Date | null;
};

function ListClass({navigation}: KlassProps) {
  const [loading, setLoading] = useState(true);
  const [listClassData, setListClassData] = useState<ClassData[]>([]);
  const [code, setCode] = useState('');
  const [isShowModalEnrollClass, setIsShowModalEnrollClass] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const toggleModalEnroll = () => {
    setIsShowModalEnrollClass(!isShowModalEnrollClass);
  };

  const handleEnrollClass = async () => {
    try {
      setLoadingEnroll(true);
      const user = await asyncData.getData();
      const data = await apis.klass.enrollClass(code, user?.id);
      if (data?.errMsg !== undefined) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `${data?.errMsg}`,
        });
      } else if (
        data !== null &&
        data?.errMsg === undefined &&
        typeof data === 'object'
      ) {
        const newClass: ClassData = {
          id: data?._id,
          name: data?.name || null,
          startTime: data?.startTime || null,
          endTime: data?.endTime || null,
        };
        setIsShowModalEnrollClass(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You enroll class successfully',
        });
        setCode('');
        setListClassData(prevList => [...prevList, newClass]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEnroll(false);
    }
  };

  const handleGetListClass = async () => {
    try {
      const user = await asyncData.getData();
      const data = await apis.klass.getClassOfStudent(user?.id);
      if (data !== null && Array.isArray(data)) {
        const listClass: ClassData[] = data.map(item => ({
          id: item?._id,
          name: item?.name || null,
          startTime: item?.startTime || null,
          endTime: item?.endTime || null,
        }));
        setListClassData(listClass);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowClass = classId => {
    navigation.navigate('DetailClass', {classId});
  };

  useFocusEffect(
    useCallback(() => {
      handleGetListClass();
    }, [])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <View style={{flex: 1}}>
          <Navbar showBackButton={true} listAction={[]} />
          <ScrollView style={{flex: 1}}>
            {listClassData.map((item, index) => (
              <Klass
                key={index}
                name={item?.name}
                classId={item?.id}
                startTime={item?.startTime}
                endTime={item?.endTime}
                handleShowClass={handleShowClass}
              />
            ))}
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
            onPress={toggleModalEnroll}
          />
          <Toast />
          {isShowModalEnrollClass && (
            <Modal
              hideModalContentWhileAnimating
              backdropTransitionOutTiming={0}
              onBackdropPress={toggleModalEnroll}
              propagateSwipe={true}
              isVisible={isShowModalEnrollClass}>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>Enroll a class</Text>
                <TextInput
                  placeholder="Enter code"
                  placeholderTextColor={'gray'}
                  value={code}
                  style={styles.textInput}
                  onChangeText={text => setCode(text)}
                />
                <TouchableOpacity
                  disabled={loadingEnroll}
                  style={styles.button}
                  onPress={handleEnrollClass}>
                  {loadingEnroll ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <View style={styles.btnEnroll}>
                      <Text style={styles.btnEnrollText}>Enroll</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </Modal>
          )}
        </View>
      )}
    </>
  );
}

export default ListClass;
