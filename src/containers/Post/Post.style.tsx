import {StyleSheet} from 'react-native';

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});

export default styles;
