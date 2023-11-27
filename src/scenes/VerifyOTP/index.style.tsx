import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpArea: {
    width: '80%',
    height: 200,
  },
  button: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row', // Added to align icon and text horizontally
    alignItems: 'center', // Center items vertically
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    zIndex: -1,
  },
  buttonText: {
    color: '#87CEFA',
    fontSize: 16,
    marginLeft: 5,
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
});

export default styles;
