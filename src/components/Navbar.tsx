import {View, TouchableOpacity, Text,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
type Props = {
  showBackButton?: boolean;
  listAction?: {
    onPress: (e?: any) => void;
    name: string;
  }[];
  title?: string
};
const Navbar = ({showBackButton = true, listAction, title}: Props) => {
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
      <View style={styles.titleScreen}>
        <Text style={styles.title}>{title}</Text>
      </View>
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
    position: 'relative',
  },
  backButton: {
    fontSize: 14,
    color: 'white',
  },
  addButton: {
    fontSize: 14,
    color: 'white',
  },
  listAction: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
  },
  titleScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});

export default Navbar;
