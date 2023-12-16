import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListClass from './ListClass';
import DetailClass from './DetailClass';

const KlassStack = createNativeStackNavigator();

function KlassStackScreen() {
  return (
    <KlassStack.Navigator screenOptions={{headerShown: false}}>
      <KlassStack.Screen name="ListClass" component={ListClass} />
      <KlassStack.Screen name="DetailClass" component={DetailClass} />
    </KlassStack.Navigator>
  );
}

export default KlassStackScreen;
