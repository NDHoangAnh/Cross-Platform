import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHomePage from './HomePage';
import AdminPostScreen from './AdminPostScreen';

const AdminHomePageStack = createNativeStackNavigator();

function AdminHomePageStackScreen() {
  return (
    <AdminHomePageStack.Navigator screenOptions={{headerShown: false}}>
      <AdminHomePageStack.Screen
        name="HomePageUserScreen"
        component={AdminHomePage}
      />
      <AdminHomePageStack.Screen
        name="HomePagePostScreen"
        component={AdminPostScreen}
      />
    </AdminHomePageStack.Navigator>
  );
}

export default AdminHomePageStackScreen;
