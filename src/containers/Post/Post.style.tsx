import {StyleSheet} from 'react-native';
import {green100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const commonStyles = {
  color: '#555',
};

const styles = StyleSheet.create({
  postContainer: {
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
  createdAt: {
    fontSize: 12,
    ...commonStyles,
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    ...commonStyles,
  },
  imagePost: {
    width: '100%',

    borderRadius: 8,
    marginBottom: 10,
    aspectRatio: 135 / 76,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    ...commonStyles,
  },
  actionText: {
    fontSize: 14,
    ...commonStyles,
  },
  moreOptionsContainer: {
    alignSelf: 'flex-end',
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
  approveText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});

export default styles;
