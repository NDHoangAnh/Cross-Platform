import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
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
    paddingBottom: 8,
    paddingTop: 8,
  },
  btnEnrollText: {
    color: '#1877f2',
  },
  noActContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivityText: {
    color: 'black',
  },
});

export default styles;
