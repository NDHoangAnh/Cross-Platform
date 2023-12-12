import {StyleSheet} from 'react-native';

const commonStyles = {
  color: '#555',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
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
    flex: 0.5,
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
  icon: {
    fontSize: 20,
    marginRight: 5,
    ...commonStyles,
  },
  active: {
    color: 'green',
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
  actionContainer: {
    flex: 0.5,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
