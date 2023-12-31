import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListClass from './ListClass';
import DetailClass from './DetailClass';
import AddActivityScene from './AddActivityScene';
import EditActivityScene from './EditActivityScene';

const KlassStack = createNativeStackNavigator();

function KlassStackScreen() {
  return (
    <KlassStack.Navigator screenOptions={{headerShown: false}}>
      <KlassStack.Screen name="ListClass" component={ListClass} />
      <KlassStack.Screen name="DetailClass" component={DetailClass} />
      <KlassStack.Screen
        name="AddActivityScreen"
        component={AddActivityScene}
      />
      <KlassStack.Screen
        name="EditActivityScreen"
        component={EditActivityScene}
      />
    </KlassStack.Navigator>
  );
}

export default KlassStackScreen;
