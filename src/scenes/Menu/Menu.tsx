import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Menu.style';

function Menu({navigation, setIsLoggedIn}) {
  const user = 1;
  const handleNavigateTarget = () => {
    navigation.navigate('Target', {screen: 'TargetScreen'});
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      {user === 1 ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Icon name="logout" style={styles.icon} />
            <Text style={styles.textMenu}>Đăng xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Icon name="google-classroom" style={styles.icon} />
            <Text style={styles.textMenu}>Danh sách lớp học</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Icon name="book-open-outline" style={styles.icon} />
            <Text style={styles.textMenu}>Bài viết của bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleNavigateTarget}>
            <Icon name="target" style={styles.icon} />
            <Text style={styles.textMenu}>Mục tiêu học tập</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Icon name="logout" style={styles.icon} />
            <Text style={styles.textMenu}>Đăng xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Icon name="forum" style={styles.icon} />
            <Text style={styles.textMenu}>Quản lý diễn đàn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Icon name="human-edit" style={styles.icon} />
            <Text style={styles.textMenu}>Quản lý người dùng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Icon name="google-classroom" style={styles.icon} />
            <Text style={styles.textMenu}>Quản lý lớp học</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default Menu;