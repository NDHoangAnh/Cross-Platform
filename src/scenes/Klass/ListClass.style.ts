import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    // alignContent: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
  textInput: {
    // flex: 1,
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderRadius: 8,
    marginRight: 8,
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 8,
    alignItems: 'center',
  },
  btnEnroll: {
    marginTop: 25,
    width: '25%',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingBottom: 8,
    paddingTop: 8,
  },
  btnEnrollText: {
    color: '#1877f2',
  },
});

export default styles;
