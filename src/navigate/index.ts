import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ForumProps = {
  navigation: NativeStackNavigationProp<any, 'ForumStack'>;
};

type KlassProps = {
  navigation: NativeStackNavigationProp<any, 'KlassStack'>;
};

export type {ForumProps, KlassProps};
