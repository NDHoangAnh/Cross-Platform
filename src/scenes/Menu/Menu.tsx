import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Menu.style';

function Menu({navigation, setIsLoggedIn, role, setRole}) {
  const handleNavigateTarget = () => {
    navigation.navigate('Target', {screen: 'TargetScreen'});
  };

  const handleNavigateAdminUser = () => {
    navigation.navigate('User Management', {screen: 'AdminUserScreen'});
  };

  const handleNavigateAdminPost = () => {
    navigation.navigate('Forum Management', {screen: 'AdminPostScreen'});
  };

  const handleNavigateClass = () => {
    navigation.navigate('Class', {screen: 'ListClass'});
  };

  const handleNavigateUserPost = () => {
    navigation.navigate('My Post');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <>
      {role === 'User' && (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} onPress={handleLogout}>
              <Icon name="logout" style={styles.icon} />
              <Text style={styles.textMenu}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={handleNavigateClass}>
              <Icon name="google-classroom" style={styles.icon} />
              <Text style={styles.textMenu}>Danh sách lớp học</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              onPress={handleNavigateUserPost}>
              <Icon name="book-open-outline" style={styles.icon} />
              <Text style={styles.textMenu}>Bài viết của bạn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={handleNavigateTarget}>
              <Icon name="target" style={styles.icon} />
              <Text style={styles.textMenu}>Mục tiêu học tập</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {role === 'Admin' && (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} onPress={handleLogout}>
              <Icon name="logout" style={styles.icon} />
              <Text style={styles.textMenu}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={handleNavigateAdminPost}>
              <Icon name="forum" style={styles.icon} />
              <Text style={styles.textMenu}>Quản lý diễn đàn</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.item}
              onPress={handleNavigateAdminUser}>
              <Icon name="human-edit" style={styles.icon} />
              <Text style={styles.textMenu}>Quản lý người dùng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {role === 'Teacher' && (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} onPress={handleLogout}>
              <Icon name="logout" style={styles.icon} />
              <Text style={styles.textMenu}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={handleNavigateUserPost}>
              <Icon name="book-open-outline" style={styles.icon} />
              <Text style={styles.textMenu}>Bài viết của bạn</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

export default Menu;
