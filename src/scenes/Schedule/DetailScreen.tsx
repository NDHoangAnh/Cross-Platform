import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {formatDate, formatTimeEdit} from '../../utils';
import apis from '../../apis';
import SimpleModal from '../../components/SimpleModal';

export default function DetailScreen({navigation, route}): React.JSX.Element {
  const item = route.params?.item ?? {};
  let reRender = route.params?.reRender ?? false;
  const [isVisibleModal, setIsVisibleModel] = React.useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const result = await apis.schedule.deletePlan(item._id);
      if (result.msg) {
        navigation.navigate('HomeScreen');
        Toast.show({
          type: 'success',
          text1: 'Completed to delete',
          text2: 'You have successfully deleted it.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to delete',
          text2: result.errMsg ?? 'Delete failed, please try again.',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete',
        text2: 'Delete failed, please try again.',
      });
    }
  };

  const returnHome = () => {
    if (reRender) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity onPress={returnHome}>
          <MaterialIcons name="close" size={32} color={'black'} />
        </TouchableOpacity>
        <View style={styles.rowHeaderLeft}>
          <TouchableOpacity
            style={styles.paddingIcon}
            onPress={() => navigation.navigate('EditScreen', {item})}>
            <MaterialIcons name="edit" size={32} color={'black'} />
          </TouchableOpacity>
          <TouchableHighlight onPress={() => setIsVisibleModel(true)}>
            <MaterialIcons name="delete-forever" size={32} color={'black'} />
          </TouchableHighlight>
        </View>
      </View>
      <Text style={styles.textHint}>My schedule</Text>
      <View style={styles.row}>
        <View style={styles.iconNoteCover}>
          <Text style={styles.blockText} />
        </View>
        <Text style={styles.textHeader}>{item.name}</Text>
      </View>
      <Text style={styles.textDate}>
        {formatTimeEdit(item.startTime)} - {formatTimeEdit(item.endTime)}
      </Text>
      <Text style={styles.textDate}>
        Created at: {item.createdAt ? formatDate(item.createdAt) : 'Not time'}
      </Text>
      <View style={styles.rowNote}>
        <View style={styles.iconNoteCover}>
          <MaterialIcons color={'gray'} name="notes" size={30} />
        </View>
        <Text style={styles.textNote}>Ghi chú: {item.description ?? ''}</Text>
      </View>
      <Toast />
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisibleModal}
        onRequestClose={() => setIsVisibleModel(false)}>
        <SimpleModal
          changeModalVisible={setIsVisibleModel}
          function={handleDelete}
          title="Delete your schedule"
          note="Are you sure about that?"
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  rowHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingIcon: {
    paddingRight: 24,
  },
  rowNote: {
    flexDirection: 'row',
    marginTop: 16,
    marginEnd: 24,
  },
  blockText: {
    width: 20,
    height: 20,
    borderRadius: 2,
    backgroundColor: 'purple',
  },
  iconNoteCover: {
    width: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textHint: {
    fontSize: 14,
    color: 'grey',
    marginStart: 60,
    fontWeight: '500',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  textDate: {
    fontSize: 16,
    marginBottom: 4,
    marginStart: 60,
    color: 'black',
  },
  textNote: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});
