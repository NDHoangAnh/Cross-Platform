import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Forum from './Forum';
import AddPostScreen from './AddPostScreen';

const ForumStack = createNativeStackNavigator();

function ForumStackScreen() {
  return (
    <ForumStack.Navigator screenOptions={{headerShown: false}}>
      <ForumStack.Screen name="ForumScreen" component={Forum} />
      <ForumStack.Screen name="AddPostScreen" component={AddPostScreen} />
    </ForumStack.Navigator>
  );
}

export default ForumStackScreen;
