import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ForumProps = {
  navigation: NativeStackNavigationProp<any, 'ForumStack'>;
};

type AdminHomePageProps = {
  navigation: NativeStackNavigationProp<any, 'AdminHomePageStack'>;
};

export type {ForumProps, AdminHomePageProps};
