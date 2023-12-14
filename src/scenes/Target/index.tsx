import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TargetHome from './TargetHome';
import CreateTarget from './CreateTarget';

const TargetNavigator = createNativeStackNavigator();

function TargetScreen() {
  return (
    <TargetNavigator.Navigator screenOptions={{headerShown: false}}>
      <TargetNavigator.Screen name="TargetScreen" component={TargetHome} />
      <TargetNavigator.Screen name="CreateTarget" component={CreateTarget} />
      <TargetNavigator.Screen name="EditTarget" component={TargetHome} />
    </TargetNavigator.Navigator>
  );
}

export default TargetScreen;