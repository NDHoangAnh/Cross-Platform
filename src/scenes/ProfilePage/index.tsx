import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './ProfilePage';
import Edit from './EditProfile';
import ChangePassword from './ChangePassword';

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="EditScreen" component={Edit} />
      <ProfileStack.Screen
        name="ChangePasswordScreen"
        component={ChangePassword}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
