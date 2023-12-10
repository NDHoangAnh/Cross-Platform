import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  otpArea: {
    width: '80%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginTop: '50%',
    marginLeft: '10%',
  },
  note: {
    fontSize: 16,
    color: 'gray',
    marginLeft: '10%',
  },
  textbox: {
    marginTop: '20%',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 0,
    padding: 10,
    marginBottom: '2%',
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
  button: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  register: {
    marginTop: '3%',
    color: 'gray',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#87CEFA',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    position: 'absolute',
    right: -200,
    top: -300,
    zIndex: -1,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  underlineStyleHighLighted: {
    borderColor: '#87CEFA',
  },
  errors: {
    color: '#FF7F7F',
    alignSelf: 'baseline',
    marginLeft: '11%',
    fontSize: 12,
  },
});

export default styles;
