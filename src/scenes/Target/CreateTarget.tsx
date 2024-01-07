import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './index.style';
import Navbar from '../../components/Navbar';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import apis from '../../apis';
import asyncData from '../../config/auth';

type Props = {
  navigation: any;
};
const CreateTarget = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      realPoint: '',
      targetPoint: '',
      listChild: [],
    },
  });

  const [loadingButtonSave, setLoadingButtonSave] = useState(false);
  const [openModalCreateChildTarget, setOpenModalCreateChildTarget] =
    useState<boolean>(false);

  const handleSaveChild = () => {
    setOpenModalCreateChildTarget(false);
  };

  const onSubmit = async value => {
    const currentUser = await asyncData.getData();
    const {listChild, ...rest} = value;
    setLoadingButtonSave(true);
    const data = await apis.target.createTarget({
      ...rest,
      userId: currentUser?.id,
    });
    if (data) {
      setLoadingButtonSave(false);
      navigation.navigate('Target', {screen: 'TargetScreen'});
    }
    reset();
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Navbar listAction={[]} />
      <View style={styles.formCreateTargetContainer}>
        <Text style={{fontWeight: '600', fontSize: 24, color: 'black'}}>
          Create Target
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Name</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
                name="name"
              />
            </View>
          </View>
          {errors.name && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Description</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
                name="description"
              />
            </View>
          </View>
          {errors.name && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Real Point</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="0"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
                name="realPoint"
              />
            </View>
          </View>
          {errors.name && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Target Point</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="0"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
                name="targetPoint"
              />
            </View>
          </View>
          {errors.name && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>
        <View>
          <TouchableOpacity
            disabled={loadingButtonSave}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textBtn}>Create</Text>
          </TouchableOpacity>
          <ActivityIndicator animating={loadingButtonSave} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateTarget;
