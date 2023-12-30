import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#87CEEB',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  timeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  timeDivider: {
    fontSize: 12,
    marginVertical: 5,
    color: 'gray',
  },
  classInfo: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 30,
    gap: 10,
  },
  className: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  weekdayText: {
    fontSize: 14,
    color: '#888',
  },
  arrowContainer: {
    alignItems: 'flex-end',
  },
  arrowIcon: {
    fontSize: 20,
    color: 'gray',
  },
});

export default styles;
