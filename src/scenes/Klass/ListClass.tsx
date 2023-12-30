import {ActivityIndicator, ScrollView, View} from 'react-native';
// import {klass} from '../../data/klass';
import Klass from '../../containers/Klass/Klass';
import Navbar from '../../components/Navbar';
import {KlassProps} from '../../navigate';
import asyncData from '../../config/auth';
import apis from '../../apis';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

type ClassData = {
  id: string | null;
  name: string | null;
  startTime: Date | null;
  endTime: Date | null;
};

function ListClass({navigation}: KlassProps) {
  const [listClassData, setListClassData] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

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
        </View>
      )}
    </>
  );
}

export default ListClass;
