import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
type Props = {
  showBackButton?: boolean;
  listAction?: {
    onPress: (e?: any) => void;
    name: string;
  }[];
};
const Navbar = ({showBackButton = true, listAction}: Props) => {
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
      <View style={styles.listAction}>
        {listAction &&
          listAction.map((action, index: number) => {
            return (
              <TouchableOpacity key={index} onPress={action.onPress}>
                <Text style={styles.addButton}>{action.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
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
  listAction: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
  },
});

export default Navbar;
