import {StyleSheet} from 'react-native';

const commonStyles = {
  color: '#555',
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    ...commonStyles,
  },
  createdAt: {
    fontSize: 12,
    ...commonStyles,
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    ...commonStyles,
  },
  imagePost: {
    width: '100%',

    borderRadius: 8,
    marginBottom: 10,
    aspectRatio: 135 / 76,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    ...commonStyles,
  },
  actionText: {
    fontSize: 14,
    ...commonStyles,
  },
  moreOptionsContainer: {
    alignSelf: 'flex-end',
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
  },
  editButton: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  deleteButton: {
    flex: 1,
    marginRight: 5,
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalButton: {
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approveText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  modalTitle: {
    color: 'black',
    fontSize: 15,
  },
  modalAction: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 100,
    marginTop: 20,
  },
  agreeAction: {
    color: 'blue',
    fontSize: 15,
  },
  disagreeAction: {
    color: 'red',
    fontSize: 15,
  },
});

export default styles;
