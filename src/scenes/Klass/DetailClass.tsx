/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {useCallback, useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import InfoClass from '../../containers/InfoClass/InfoClass';
import Navbar from '../../components/Navbar';
import Activities from '../../containers/Activities/Activities';
import apis from '../../apis';

type StudentData = {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
};

type ActivityData = {
  id: string | null;
  name: string | null;
  time: Date | null;
  type: string | null;
  content: string | null;
};

type DetailClassData = {
  teacherName: string | null;
  teacherEmail: string | null;
  students: StudentData[] | null;
  activity: ActivityData[] | null;
  startTime: Date | null;
  endTime: Date | null;
  name: string | null;
  code: string | null;
};

function DetailClass({route, navigation}) {
  const {classId, roleInClass} = route.params;
  const [detailClass, setDetailClass] = useState<DetailClassData>();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const handleGetDetailClass = async () => {
    try {
      const data = await apis.klass.getDetailClass(classId);
      if (data !== null && typeof data === 'object') {
        const klass: DetailClassData = {
          teacherName: data?.teacherId?.username || null,
          teacherEmail: data?.teacherId?.email || null,
          students: data?.studentId?.map(student => ({
            id: student?._id,
            name: student?.username || null,
            avatar:
              student?.avatar ||
              'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
            email: student?.email || null,
          })),
          name: data?.name || null,
          code: data?.code || null,
          startTime: data?.startTime || null,
          endTime: data?.endTime || null,
          activity: data?.activity?.map(item => ({
            id: item?._id,
            name: item?.name || null,
            type: item?.type || null,
            time: item?.time || null,
            content: item?.content || null,
          })),
        };

        setDetailClass(klass);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToEditClassScreen = infoClass => {
    navigation.navigate('EditClassScene', {infoClass, classId});
  };

  const handleNavigateToAddScreen = () => {
    navigation.navigate('AddActivityScreen', {classId});
  };

  const handleNavigateToEditScreen = act => {
    navigation.navigate('EditActivityScreen', {activity: act});
  };

  const handleDeleteActivity = async id => {
    try {
      await apis.activity.deleteActivity(id);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const routes = [
    {key: 'info', title: 'Class Info'},
    {key: 'activities', title: 'Activities'},
  ];

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'info':
        return (
          <InfoClass
            handleNavigateToEditClassScreen={handleNavigateToEditClassScreen}
            infoClass={detailClass}
            roleInClass={roleInClass}
          />
        );
      case 'activities':
        return (
          <Activities
            handleNavigateToAddScreen={handleNavigateToAddScreen}
            handleNavigateToEditScreen={handleNavigateToEditScreen}
            activities={detailClass?.activity ?? []}
            roleInClass={roleInClass}
            handleDeleteActivity={handleDeleteActivity}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: 'white'}}
      activeColor="blue"
      inactiveColor="black"
    />
  );

  useFocusEffect(
    useCallback(() => {
      handleGetDetailClass();
    }, [handleGetDetailClass])
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <>
          <Navbar listAction={[]} />
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
          />
        </>
      )}
    </>
  );
}

export default DetailClass;
