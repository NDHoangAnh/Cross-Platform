import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHomePage from './HomePage';

const ForumStack = createNativeStackNavigator();

function AdminHomePageStackScreen() {
  return (
    <ForumStack.Navigator screenOptions={{headerShown: false}}>
      <ForumStack.Screen name="ForumScreen" component={AdminHomePage} />
      {/* <ForumStack.Screen name="AddPostScreen" component={AddPostScreen} /> */}
    </ForumStack.Navigator>
  );
}

export default AdminHomePageStackScreen;
