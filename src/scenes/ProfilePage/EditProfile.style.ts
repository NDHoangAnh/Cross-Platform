import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
  },

  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarText: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(52, 152, 219, 0.9)', // Blue background color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },

  birthDateContainer: {
    marginTop: 10, // Add margin to separate from the previous input
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items on the same row with space between
    alignItems: 'center',
  },

  chooseDateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },

  chooseDateButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  datePicker: {
    flex: 1, // Take remaining space
    marginLeft: 1, // Add margin to separate from the button
  },

  image: {
    resizeMode: 'contain',
    width: '200%',
    height: '200%',
    position: 'absolute',
    right: -10,
    top: 0,
    zIndex: -1,
  },

  imageTop: {
    resizeMode: 'contain',
    width: '200%',
    height: '200%',
    position: 'absolute',
    right: -250,
    top: -950,
    zIndex: -1,
  },
});

export default styles;
