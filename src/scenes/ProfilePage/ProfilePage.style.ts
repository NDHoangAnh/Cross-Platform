import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#ccc',
  },

  userPicture: {
    width: 140,
    height: 140,
    borderRadius: 75,
    marginTop: 60,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    marginBottom: 20,
  },

  infoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },

  postsContainer: {
    marginLeft: 10,
    marginRight: 10,
  },

  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '95%',
  },
  infoCardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  infoCardText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#3498db',
    borderRadius: 50,
  },
});

export default styles;
