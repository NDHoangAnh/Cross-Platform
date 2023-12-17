import React, {useState} from "react";
import {FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import Navbar from "../../components/Navbar";
import styles from './index.style'
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
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
}]

type Props = {
  navigation: NativeStackNavigationProp<any, 'TargetScreen', undefined>
}
const TargetHome = ({navigation}: Props) => {
  const [currentTarget, setCurrentTarget] = useState<any>();
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
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
  const handleDelete = () => {
  
  }
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
        <Text>{item.description}</Text>
      </View>
      <View>
        <Text>Target: <Text style={styles.point}>{item.target}</Text></Text>
        <Text>Current: <Text style={styles.point}>{item.real_point}</Text></Text>
      </View>
    </View>
  };
  console.log(currentTarget)
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
          <View style={styles.formItem}>
            <Text style={styles.labelField}>Name</Text>
            <Text>{currentTarget?.name}</Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labelField}>Description</Text>
            <Text>{currentTarget?.description}</Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labelField}>Real Point</Text>
            <Text>{currentTarget?.real_point}</Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.labelField}>Target Point</Text>
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
            <TextInput
              style={styles.input}
              value={`${currentTarget?.name}`}
              placeholder="Name"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={`${currentTarget?.description}`}
              placeholder="Description"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Real Point</Text>
            <TextInput
              style={styles.input}
              value={`${currentTarget?.real_point}`}
              placeholder="Real Point"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Target Point</Text>
            <TextInput
              style={styles.input}
              value={`${currentTarget?.target}`}
              placeholder="Target Point"
              keyboardType="numeric"
            />
          </View>
        </View>
        <Pressable onPress={() => {}} style={[styles.button, styles.buttonSaveChild]}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </Modal>
  </View>
}

export default  TargetHome;
