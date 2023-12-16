import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings({setIsLoggedIn}) {
  const handleSignOut = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

export default Settings;
