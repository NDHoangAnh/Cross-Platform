import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  itemTarget: {
    minHeight: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black',
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: 'white'
  },
  container: {
    height: '100%',
    width: '100%',
  },
  nameTarget: {
    fontWeight: 'bold'
  },
  point: {
    fontWeight: 'bold',
    color: 'black'
    
  },
  formCreateTargetContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
    width: '100%',
    flex: 1,
    gap: 8
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#ccc',
    borderRadius: 4,
    flex: 1
  },
  inputContainer: {
    rowGap: 12,
    width: '100%'
  },
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  formLabel: {
    minWidth: 80,
    fontWeight: '600'
  },
  labelField: {
    fontWeight: '600'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 20,
    width: 80
  },
  childTargetItem: {
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },
  buttonLink: {
    alignItems: 'center',
  },
  modal: {
    padding: 16,
    marginTop: 20,
    paddingTop: 10,
    display: "flex",
    alignItems: 'center'
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: 10,
    backgroundColor: 'transparent',
    fontSize: 50,
    alignSelf: 'flex-end',
    borderRadius: 25,
  },
  buttonSaveChild: {
    marginTop: 16
  },
  modalFooter: {
    display: "flex",
    flexDirection: 'row',
    gap: 12
  },
  childTarget: {
    width: '100%',
    minHeight: 32,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  }
});

export default styles;
