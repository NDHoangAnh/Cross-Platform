import {View, Image} from 'react-native';
import styles from './index.style';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../public/loading.gif')}
        style={styles.loadingImage}
      />
    </View>
  );
};

export default LoadingScreen;
