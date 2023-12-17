import {Button, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./index.style";
import Navbar from "../../components/Navbar";
import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import {createTarget} from "../../apis";
import asyncData from "../../config/auth";

type Props = {}
const CreateTarget = ({}: Props) => {
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      realPoint: '',
      targetPoint: '',
      listChild: []
    }
  });
  
  const [realPoint, setRealPoint] = useState<string>('0');
  const [targetPoint, setTargetPoint] = useState<string>('0');
  const [openModalCreateChildTarget, setOpenModalCreateChildTarget] = useState<boolean>(false);
  
  const handleOpenModalAddChildTarget = () => {
    setOpenModalCreateChildTarget(true)
  }
  const handleSaveChild = () => {
    setOpenModalCreateChildTarget(false)
  }
  
  const onSubmit = async (value) => {
    const currentUser = await asyncData.getData();
    
    await createTarget({
      ...value,
      userId:currentUser?.id
    })
    reset()
  }
  
  return <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
    <Navbar listAction={[{onPress: () => {}, name:'Edit' },{onPress: () => {}, name:'Add' }]} />
    <View style={styles.formCreateTargetContainer}>
      <Text style={{fontWeight: '600', fontSize: 16}}>Create Target</Text>
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
            {errors.name && <Text style={styles.errorText}>This is required.</Text>}
          </View>
        </View>
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
                  placeholder="0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="realPoint"
            />
            {errors.realPoint && <Text style={styles.errorText}>This is required.</Text>}
          </View>
        </View>
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
                  placeholder="0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name="targetPoint"
            />
            {errors.targetPoint && <Text style={styles.errorText}>This is required.</Text>}
          </View>
          
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Child Target</Text>
          <TouchableOpacity style={styles.buttonLink} onPress={handleOpenModalAddChildTarget}>
            <Text style={{textDecorationLine: 'underline'}}>Add Child Target</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
    <Modal
      animationType="slide"
      visible={openModalCreateChildTarget}
      onRequestClose={() => {
        setOpenModalCreateChildTarget(false)
      }}>
      <View style={styles.modal}>
        <View style={{width: '100%', paddingVertical: 15, display: 'flex', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Create Child Target</Text>
        </View>
        <Pressable
          style={styles.buttonClose}
          onPress={() => setOpenModalCreateChildTarget(false)}
        >
          <Text>X</Text>
        </Pressable>
        <View style={styles.inputContainer}>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={''}
              placeholder="Name"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Real Point</Text>
            <TextInput
              style={styles.input}
              value={realPoint}
              placeholder="Real Point"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Target Point</Text>
            <TextInput
              style={styles.input}
              value={targetPoint}
              placeholder="Target Point"
              keyboardType="numeric"
            />
          </View>
        </View>
        <Pressable onPress={handleSaveChild} style={[styles.button, styles.buttonSaveChild]}>
          <Text>Save</Text>
        </Pressable>
        {/*<Pressable*/}
        {/*  style={[styles.button, styles.buttonClose]}*/}
        {/*  onPress={() => setOpenModalCreateChildTarget(false)}>*/}
        {/*  <Text>Hide Modal</Text>*/}
        {/*</Pressable>*/}
      </View>
    </Modal>
  </ScrollView>
}

export default CreateTarget