/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Controller, useForm} from 'react-hook-form';
import Navbar from '../../components/Navbar';
import styles from './index.style';
import apis from '../../apis';
import asyncData from '../../config/auth';
import {useFocusEffect} from '@react-navigation/native';

type TargetType = {
  id: String;
  name: string;
  target: number;
  real_point: number;
  description?: string;
};

type Props = {
  navigation: NativeStackNavigationProp<any, 'TargetScreen', undefined>;
};

const TargetHome = ({navigation}: Props) => {
  const [listTarget, setListTarget] = useState<any>([]);
  const [currentTarget, setCurrentTarget] = useState<any>();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      realPoint: '',
      targetPoint: '',
    },
  });

  const handleRedirectCreateTarget = () => {
    navigation.navigate('CreateTarget');
  };

  const handleOpenViewDetail = item => {
    setCurrentTarget(item);
    setOpenModalDetail(true);
  };

  const handleGetTargetAllTarget = async () => {
    try {
      const user = await asyncData.getData();
      const data = await apis.target.getAllTargets({userId: user?.id});
      if (data !== null && Array.isArray(data)) {
        const listTargetOfUser: TargetType[] = data.map(item => ({
          id: item?._id,
          description: item?.description || null,
          name: item?.name || null,
          target: item?.targetPoint || null,
          real_point: item?.realPoint || null,
        }));
        setListTarget(listTargetOfUser);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTarget = () => {
    setOpenModalDetail(false);
    setOpenModalEdit(true);
  };

  const handleDelete = async () => {
    await apis.target.deleteTarget(currentTarget?.id);
    setOpenModalDetail(false);
    handleGetTargetAllTarget();
  };

  const handleConfirmEditTarget = async value => {
    try {
      await apis.target.editTarget({
        ...value,
        targetId: currentTarget?.id,
      });
      setOpenModalEdit(false);
      handleGetTargetAllTarget();
    } catch (e) {
      console.log(e);
    }
  };

  const renderItemTarget = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleOpenViewDetail(item)}
        style={styles.itemTarget}>
        <View>
          <Text style={styles.nameTarget}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View>
          <Text style={styles.label}>
            Target:{' '}
            <Text style={styles.point}>
              {'  '}
              {item.target}
            </Text>
          </Text>
          <Text style={styles.label}>
            Current: <Text style={styles.point}>{item.real_point}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      handleGetTargetAllTarget();
    }, [])
  );

  useEffect(() => {
    if (openModalEdit) {
      setValue('name', currentTarget?.name);
      setValue('description', currentTarget?.description);
      setValue('realPoint', currentTarget?.real_point?.toString());
      setValue('targetPoint', currentTarget?.target?.toString());
    }
  }, [openModalEdit]);

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{flex: 1}} size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <Navbar
            title={'Target'}
            listAction={[{onPress: handleRedirectCreateTarget, name: 'Add'}]}
          />
          <View style={{paddingHorizontal: 8}}>
            <FlatList data={listTarget} renderItem={renderItemTarget} />
          </View>
          <Modal
            animationType="slide"
            visible={openModalDetail}
            onRequestClose={() => {
              setOpenModalDetail(false);
            }}>
            <View style={styles.modal}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 28,
                    textTransform: 'capitalize',
                    color: 'black',
                  }}>
                  Target Detail
                </Text>
              </View>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setOpenModalDetail(false)}>
                <Text style={{color: 'black'}}>X</Text>
              </Pressable>
              <View style={styles.inputContainer}>
                <View style={styles.formItem}>
                  <Text style={styles.labelField}>Name</Text>
                  <Text style={styles.contentTarget}>
                    {currentTarget?.name}
                  </Text>
                </View>
                <View style={styles.formItem}>
                  <Text style={styles.labelField}>Description</Text>
                  <Text style={styles.contentTarget}>
                    {currentTarget?.description}
                  </Text>
                </View>
                <View style={styles.formItem}>
                  <Text style={styles.labelField}>Real Point</Text>
                  <Text style={styles.contentTarget}>
                    {currentTarget?.real_point}
                  </Text>
                </View>
                <View style={styles.formItem}>
                  <Text style={styles.labelField}>Target Point</Text>
                  <Text style={styles.contentTarget}>
                    {currentTarget?.target}
                  </Text>
                </View>
              </View>
              <View style={styles.modalFooter}>
                <Pressable
                  onPress={handleEditTarget}
                  style={[styles.button, styles.buttonSaveChild]}>
                  <Text style={styles.textBtn}>Edit</Text>
                </Pressable>
                <Pressable
                  onPress={handleDelete}
                  style={[styles.deleteButton, styles.buttonSaveChild]}>
                  <Text style={styles.textBtn}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={openModalEdit}
            onRequestClose={() => {
              setOpenModalEdit(false);
            }}>
            <View style={styles.modal}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 15,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
                  Edit Target
                </Text>
              </View>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setOpenModalEdit(false)}>
                <Text>X</Text>
              </Pressable>
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
                {errors.description && (
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
                    {errors.realPoint && (
                      <Text style={styles.errorText}>This is required.</Text>
                    )}
                  </View>
                </View>
                {errors.realPoint && (
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
                {errors.targetPoint && (
                  <Text style={styles.errorText}>This is required.</Text>
                )}
              </View>
              <View style={styles.modalFooter}>
                <Pressable
                  onPress={handleSubmit(handleConfirmEditTarget)}
                  style={[styles.saveButton, styles.buttonSaveChild]}>
                  <Text style={styles.textBtn}>Save</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default TargetHome;
