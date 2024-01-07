import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
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
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  content: {
    marginBottom: 10,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    color: '#555',
  },
  postButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePickerText: {
    color: '#1877f2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 20,
  },
  modalTitle: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
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
