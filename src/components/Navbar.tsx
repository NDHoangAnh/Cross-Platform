import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const Navbar = ({showBackButton = true, action, actionName}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.navbar}>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      )}
      {action && (
        <TouchableOpacity onPress={action}>
          <Text style={styles.addButton}>{actionName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#347cf8',
    padding: 10,
    zIndex: 1,
    width: '100%',
  },
  backButton: {
    fontSize: 16,
    color: 'white',
  },
  addButton: {
    fontSize: 16,
    color: 'white',
  },
});

export default Navbar;
