import React, {useEffect, useState} from "react";
import {FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import Navbar from "../../components/Navbar";
import styles from './index.style'
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {deleteTarget, editTarget, getAllTargets} from "../../apis";
import {Controller, useForm} from "react-hook-form";
import {Dialog, Portal} from "react-native-paper";
type ChildTarget = Omit<TargetType, 'childTarget'>
type TargetType = {
  name: string
  target: number,
  real_point: number
  description?: string
  childTarget: ChildTarget[]
}
const dumbData: TargetType[] = [{
  name: 'Thanh-1',
  target: 10,
  real_point: 5,
  description: 'description 1',
  childTarget: [{
    name: 'Thanh-child-1',
    target: 10,
    real_point: 6,
  },{
    name: 'Thanh-child-2',
    target: 10,
    real_point: 1,
  },{
    name: 'Thanh-child-3',
    target: 10,
    real_point: 2,
  }],
}, {
  name: 'Thanh-2',
  target: 6,
  real_point: 1,
  description: 'description 2',
  childTarget: [{
    name: 'Thanh-child-1',
    target: 10,
    real_point: 6,
    description: 'description 2',
    
  },{
    name: 'Thanh-child-2',
    target: 10,
    real_point: 1,
    description: 'description 2',
    
  },{
    name: 'Thanh-child-3',
    target: 10,
    real_point: 2,
    description: 'description 2',
    
  }]
}, {
  name: 'trang',
  target: 9.75,
  real_point: 6,
  description: 'trang',
  childTarget: [{
    name: 'Thanh-child-1',
    target: 10,
    real_point: 6,
    description: 'description 2',

  },{
    name: 'Thanh-child-2',
    target: 10,
    real_point: 1,
    description: 'description 2',

  },{
    name: 'Thanh-child-33333',
    target: 10,
    real_point: 2,
    description: 'description 2',

  }]
}, {
  name: 'Thanh-213213212',
  target: 10,
  real_point: 5,
  description: 'description 2132132132',
  childTarget: []
}]

type Props = {
  navigation: NativeStackNavigationProp<any, 'TargetScreen', undefined>
}
const TargetHome = ({navigation}: Props) => {
  const [listTarget, setListTarget] = useState<any>([]);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<any>();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    defaultValues: {
      name: '',
      description: '',
      realPoint: '',
      targetPoint: '',
      listChild: []
    }
  });
  const handleRedirectCreateTarget = () => {
    navigation.navigate('CreateTarget');
  }
  const handleOpenViewDetail = (item) => {
    setCurrentTarget(item)
    setOpenModalDetail(true)
  }
  
  const handleEditTarget = () => {
    setOpenModalDetail(false)
    setOpenModalEdit(true)
  }
  const handleDelete = async () => {
    setIsConfirmDelete(true)
  }
  const handleConfirmEditTarget = async value => {
    await editTarget({...value})
  }
  
  useEffect(() => {
    getAllTargets({userId: 'hehehe'}).then((rs) => {
      setListTarget(rs || [])
    })
  }, []);

  useEffect(() => {
    if (openModalEdit) {
      setValue("name", currentTarget?.name)
      setValue("description", currentTarget?.description)
      setValue("realPoint", currentTarget?.real_point?.toString())
      setValue("targetPoint", currentTarget?.target?.toString())
    }
  }, [openModalEdit]);
  const renderItemTarget = ({item}) => {
    return <TouchableOpacity onPress={() => handleOpenViewDetail(item)} style={styles.itemTarget}>
      <View>
        <Text style={styles.nameTarget}>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
      <View>
        <Text>Target: <Text style={styles.point}>{item.target}</Text></Text>
        <Text>Current: <Text style={styles.point}>{item.real_point}</Text></Text>
      </View>
    </TouchableOpacity>
  };

  const renderChildTarget = ({item}) => {
    return <View style={styles.childTarget}>
      <View>
        <Text style={styles.nameTarget}>{item.name}</Text>
        <Text style={{color: 'black'}}>{item.description}</Text>
      </View>
      <View>
        <Text style={{color: 'black'}}>Target: <Text style={styles.point}>{item.target}</Text></Text>
        <Text style={{color: 'black'}}>Current: <Text style={styles.point}>{item.real_point}</Text></Text>
      </View>
    </View>
  };
  return  <View style={styles.container}>
    <Navbar title={'List Target'} listAction={[{onPress: handleRedirectCreateTarget, name:'Add' }]} />
    <View style={{paddingHorizontal: 8}}>
      <FlatList
        data={dumbData}
        renderItem={renderItemTarget}
      />
    </View>

    <Modal
      animationType="slide"
      visible={openModalDetail}
      onRequestClose={() => {
        setOpenModalDetail(false)
      }}>
      <View style={styles.modal}>
        <View style={{width: '100%', paddingVertical: 15, display: 'flex', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textTransform: 'capitalize'}}>Target Detail</Text>
        </View>
        <Pressable
          style={styles.buttonClose}
          onPress={() => setOpenModalDetail(false)}
        >
          <Text>X</Text>
        </Pressable>
        <View style={styles.inputContainer}>
          <View style={styles.formItemDetail}>
            <Text style={styles.labelFieldDetail}>Name</Text>
            <Text>{currentTarget?.name}</Text>
          </View>
          <View style={styles.formItemDetail}>
            <Text style={styles.labelFieldDetail}>Description</Text>
            <Text>{currentTarget?.description}</Text>
          </View>
          <View style={styles.formItemDetail}>
            <Text style={styles.labelFieldDetail}>Real Point</Text>
            <Text>{currentTarget?.real_point}</Text>
          </View>
          <View style={styles.formItemDetail}>
            <Text style={styles.labelFieldDetail}>Target Point</Text>
            <Text>{currentTarget?.target}</Text>
          </View>
          
        </View>
        {currentTarget?.childTarget?.length > 0 && <View style={{width: '100%', marginTop: 8}}>
          <Text style={styles.formLabel}>Child Target</Text>
          <View>
            <FlatList
              data={currentTarget?.childTarget}
              renderItem={renderChildTarget}
            />
          </View>
        </View>}
        <View style={styles.modalFooter}>
          <Pressable onPress={handleEditTarget} style={[styles.button, styles.buttonSaveChild]}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={[styles.button, styles.buttonSaveChild]}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    
    
    
    
    
    
    
    <Modal
      animationType="slide"
      visible={openModalEdit}
      onRequestClose={() => {
        reset()
        setOpenModalEdit(false)
      }}>
      <View style={styles.modal}>
        <View style={{width: '100%', paddingVertical: 15, display: 'flex', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Edit Target</Text>
        </View>
        <Pressable
          style={styles.buttonClose}
          onPress={() => setOpenModalEdit(false)}
        >
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
                render={({ field: { onChange, onBlur, value } }) => (
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
          {errors.name && <Text style={styles.errorText}>This is required.</Text>}

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Description</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
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
              {errors.description && <Text style={styles.errorText}>This is required.</Text>}
            </View>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Real Point</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
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
          {errors.realPoint && <Text style={styles.errorText}>This is required.</Text>}

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Target Point</Text>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
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
          {errors.targetPoint && <Text style={styles.errorText}>This is required.</Text>}

        </View>
        <Pressable onPress={handleSubmit(handleConfirmEditTarget)} style={[styles.button, styles.buttonSaveChild]}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </Modal>
  </View>
}

export default  TargetHome;
