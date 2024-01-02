import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityItem: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  activityText: {
    color: 'black',
  },
  typeText: {
    borderRadius: 5,
    padding: 5,
    borderWidth: 0.2,
    fontSize: 10,
    color: '#1877f2',
  },
  activityTitle: {
    fontWeight: 'bold',
  },
  noActContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivityText: {
    color: 'black',
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
  },
  editButton: {
    flex: 1,
    marginRight: 5,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    borderColor: 'lightcoral',
    borderWidth: 1,
  },
  blueText: {
    color: 'blue',
  },
  redText: {
    color: 'red',
  },
});

export default styles;
