import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    marginTop: '30%',
    marginLeft: '10%',
  },
  note: {
    fontSize: 18,
    color: 'gray',
    marginLeft: '10%',
  },
  textbox: {
    marginTop: '15%',
    alignItems: 'center',
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
  button: {
    backgroundColor: '#87CEFA',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  register: {
    marginTop: '5%',
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
  errors: {
    color: '#FF7F7F',
    alignSelf: 'baseline',
    marginLeft: '11%',
    fontSize: 12,
  },
});

export default styles;
