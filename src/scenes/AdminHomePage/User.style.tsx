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
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    ...commonStyles,
  },
  role: {
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
    borderRadius: 20,
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
  errors: {
    color: '#FF7F7F',
    alignSelf: 'baseline',
    marginLeft: '11%',
    fontSize: 12,
  },
  textbox: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    marginTop: 10,
  },
  register: {
    marginTop: '5%',
    color: 'gray',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#87CEFA',
  },
  input: {
    color: 'black',
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 0,
    padding: 10,
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: 'black',
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
