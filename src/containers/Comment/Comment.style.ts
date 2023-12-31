import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 8,
    margin: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  commentText: {
    color: 'black',
  },
  createdAt: {
    marginTop: 10,
    color: 'gray',
    fontSize: 10,
  },
  modalButtonContainer: {
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
