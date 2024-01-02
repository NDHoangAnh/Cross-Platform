import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: 'black',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    color: 'black',
    borderWidth: 0.2,
    borderRadius: 5,
    margin: 5,
  },
  content: {
    textAlignVertical: 'top',
    color: 'black',
    borderWidth: 0.2,
    borderRadius: 5,
    margin: 5,
  },
  chooseDateButton: {
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDate: {
    color: 'blue',
  },
  resultDate: {
    color: 'black',
    textAlign: 'right',
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#dce0dd',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnAdd: {
    alignItems: 'center',
  },
  btnAddText: {
    fontSize: 16,
    color: '#1877f2',
  },
});

export default styles;
