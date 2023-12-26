import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  activityItem: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  activityText: {
    color: 'black',
  },
  activityTitle: {
    fontWeight: 'bold',
  },
  noActContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActivityText: {
    color: 'black',
  },
});

export default styles;
