import {Button, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./index.style";
import Navbar from "../../components/Navbar";
import React, {useState} from "react";

type Props = {}
const CreateTarget = ({}: Props) => {
  
  const [nameTarget, setNameTarget] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [realPoint, setRealPoint] = useState<string>('0');
  const [targetPoint, setTargetPoint] = useState<string>('0');
  const [openModalCreateChildTarget, setOpenModalCreateChildTarget] = useState<boolean>(false);
  const handleOpenModalAddChildTarget = () => {
    setOpenModalCreateChildTarget(true)
  }
  const handleSaveChild = () => {
    setOpenModalCreateChildTarget(false)
  }
  
  return <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
    <Navbar listAction={[{onPress: () => {}, name:'Edit' },{onPress: () => {}, name:'Add' }]} />
    <View style={styles.formCreateTargetContainer}>
      <Text>Create Target</Text>
      <View style={styles.inputContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={nameTarget}
            placeholder="Name"
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            placeholder="Description"
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
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Child Target</Text>
          <TouchableOpacity style={styles.buttonLink} onPress={handleOpenModalAddChildTarget}>
            <Text style={{textDecorationLine: 'underline'}}>Add Child Target</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
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
        <Pressable onClick={handleSaveChild} style={[styles.button, styles.buttonSaveChild]}>
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