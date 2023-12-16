import {klass} from '../../data/klass';
import {ScrollView, View} from 'react-native';
import Klass from '../../containers/Klass/Klass';
import Navbar from '../../components/Navbar';
import {KlassProps} from '../../navigate';

function ListClass({navigation}: KlassProps) {
  const handleShowClass = classId => {
    navigation.navigate('DetailClass', {classId});
  };
  return (
    <View style={{flex: 1}}>
      <Navbar showBackButton={true} listAction={[]} />
      <ScrollView style={{flex: 1}}>
        {klass.map((item, index) => (
          <Klass
            key={index}
            infoClass={item}
            handleShowClass={handleShowClass}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default ListClass;
