import React from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings({setIsLoggedIn}) {
  const handleSignOut = async () => {
    // Clear AsyncStorage data
    await AsyncStorage.clear();

    // Navigate to the Login screen (you may need to replace 'Login' with your actual login screen name)
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
      <Text style={{color: 'white'}}>Settings test</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

export default Settings;
