import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Forum from './Forum';
import AddPostScreen from './AddPostScreen';
import ListComments from './ListComments';

const ForumStack = createNativeStackNavigator();

function ForumStackScreen() {
  return (
    <ForumStack.Navigator screenOptions={{headerShown: false}}>
      <ForumStack.Screen name="ForumScreen" component={Forum} />
      <ForumStack.Screen name="AddPostScreen" component={AddPostScreen} />
      <ForumStack.Screen name="ListCommentsScreen" component={ListComments} />
    </ForumStack.Navigator>
  );
}

export default ForumStackScreen;
