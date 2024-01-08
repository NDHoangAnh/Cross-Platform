/* eslint-disable react-hooks/exhaustive-deps */
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
  roleInClass: string | null;
};

function ListClass({navigation}: KlassProps) {
  const [loading, setLoading] = useState(true);
  const [listClassData, setListClassData] = useState<ClassData[]>([]);
  const [code, setCode] = useState('');
  const [isShowModalEnrollClass, setIsShowModalEnrollClass] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const [roleUser, setRoleUser] = useState<string | null>(null);
  const toggleModalEnroll = () => {
    setIsShowModalEnrollClass(!isShowModalEnrollClass);
  };

  const handleGetRoleUser = async () => {
    const user = await asyncData.getData();
    if (user && user.role !== undefined && user.role !== null) {
      setRoleUser(user.role);
    }
  };

  const handleNavigateToAddScene = () => {
    navigation.navigate('AddClassScene');
  };

  const handleDeleteClass = async id => {
    try {
      await apis.klass.deleteClass(id);
      handleGetListClass();
      return;
    } catch (error) {
      console.log(error);
    }
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
          roleInClass: 'User',
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
    await handleGetRoleUser();
    try {
      const user = await asyncData.getData();
      if (user?.role === 'User') {
        const data = await apis.klass.getClassOfStudent(user?.id);
        if (data !== null && Array.isArray(data)) {
          const listClass: ClassData[] = data.map(item => ({
            id: item?._id,
            name: item?.name || null,
            startTime: item?.startTime || null,
            endTime: item?.endTime || null,
            roleInClass: 'User',
          }));
          setListClassData(listClass);
          setLoading(false);
        }
      }
      if (user?.role === 'Teacher') {
        const data = await apis.klass.getClassOfTeacher(user?.id);
        if (data !== null && Array.isArray(data)) {
          const listClass: ClassData[] = data.map(item => ({
            id: item?._id,
            name: item?.name || null,
            startTime: item?.startTime || null,
            endTime: item?.endTime || null,
            roleInClass: 'Teacher',
          }));
          setListClassData(listClass);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowClass = (classId, roleInClass) => {
    navigation.navigate('DetailClass', {classId, roleInClass});
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
          <Navbar showBackButton={false} title="List Classes" listAction={[]} />
          {listClassData && listClassData.length > 0 && (
            <ScrollView style={{flex: 1}}>
              {listClassData.map((item, index) => (
                <Klass
                  key={index}
                  name={item?.name}
                  classId={item?.id}
                  startTime={item?.startTime}
                  endTime={item?.endTime}
                  handleShowClass={handleShowClass}
                  roleInClass={item?.roleInClass}
                  handleDeleteClass={handleDeleteClass}
                />
              ))}
            </ScrollView>
          )}
          {listClassData && listClassData.length === 0 && (
            <View style={styles.noActContainer}>
              <Text style={styles.noActivityText}>
                You have not enrolled any class
              </Text>
            </View>
          )}
          {roleUser && roleUser === 'User' && (
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
          )}
          {roleUser && roleUser === 'Teacher' && (
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
              onPress={handleNavigateToAddScene}
            />
          )}
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
