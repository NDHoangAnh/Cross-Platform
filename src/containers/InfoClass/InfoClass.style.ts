import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  studentsBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 20,
    marginRight: 10,
  },
  blackText: {
    color: 'black',
    fontSize: 15,
  },
});

export default styles;
