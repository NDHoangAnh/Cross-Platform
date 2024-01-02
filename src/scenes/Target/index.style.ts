import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemTarget: {
    minHeight: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 0.2,
    color: 'black',
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: 'white',
  },
  // container: {
  //   height: '100%',
  //   width: '100%',
  // },
  nameTarget: {
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    color: 'black',
  },
  label: {
    color: 'black',
  },
  point: {
    fontWeight: 'bold',
    color: 'black',
  },
  formCreateTargetContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
    width: '100%',
    flex: 1,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#ccc',
    borderRadius: 4,
    flex: 1,
    color: 'black',
  },
  inputContainer: {
    rowGap: 12,
    width: '100%',
  },
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
    minHeight: 40
  },
  formItemDetail: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8,
    minHeight: 30
    justifyContent: 'center',
  },
  formLabel: {
    minWidth: 80,
    fontWeight: '600',
    color: 'black',
  },
  labelField: {
    fontWeight: '600',
    color: 'black',
  },
  contentTarget: {
    color: 'black',
  },
  labelFieldDetail: {
    minWidth: 100
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    padding: 10,
    marginTop: 20,
    width: 80,
  },
  textBtn: {
    color: 'white',
  },
  modal: {
    padding: 16,
    marginTop: 20,
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center',
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
    marginTop: 16,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
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
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontWeight: '600',
    paddingLeft: 90
  }
});

export default styles;
