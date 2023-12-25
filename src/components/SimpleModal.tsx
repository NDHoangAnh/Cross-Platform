import React from 'react';
import {
  Dimensions,
  StyleSheet,Text,TouchableOpacity,View
} from 'react-native';

type parameter = {
  title: string | null;
  note: string | null;
  function: Function;
  changeModalVisible: Function;
}

const HEIGHT_MODAL = 150;
const WIDTH_MODAL = Dimensions.get('window').width;
export default function SimpleModal(props : parameter) : React.JSX.Element {

  console.log(props.title, props.note);
  const onCloseModal = (bool :boolean,data: boolean) => {
    props.changeModalVisible(bool);
    if (data) {props.function();}
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.text}>{props.note}</Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => onCloseModal(false,false)} style={styles.touchableOpacity}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCloseModal(false,true)} style={styles.touchableOpacity}>
            <Text style={styles.textOk}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH_MODAL - 80,
    paddingTop: 10,
    backgroundColor: 'white',
    shadowColor: 'AAAAAA',
    shadowOpacity: 0.5,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  buttonsView: {
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    fontSize:16,
    fontWeight: 'bold',
    color: 'black',
  },
  textCancel: {
    margin: 5,
    fontSize:16,
    fontWeight: 'bold',
    color: 'blue',
  },
  textOk: {
    margin: 5,
    fontSize:16,
    fontWeight: 'bold',
    color: 'red',
  },
  touchableOpacity: {
    flex:1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
