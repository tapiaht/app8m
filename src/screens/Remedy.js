import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, SafeAreaView  } from 'react-native';
import {Dropdown} from "react-native-element-dropdown"
import {addTaskApi} from "../api/task"
const Remedy = ({ visible,setModalVisible,onClose, onSubmit,style }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [advice, setAdvice] = useState('');
  const [picture, setPicture] = useState('');
  const [value, setValue] = useState(null);
  const handleSubmit = () => {
    onSubmit({ title, type, advice, picture });
    const newTask={title:title,type:value,advice:advice,picture:picture}
    const result = addTaskApi(newTask);
    console.log("💪 Remedio creado"+Object.entries(result))
    setTitle('');
    setType('');
    setAdvice('');
    setPicture('');
    setModalVisible(!visible)
    
  };
  const data = [
    { label: 'Agua', value: '1' },
    { label: 'Descanso', value: '2' },
    { label: 'Ejercicio', value: '3' },
    { label: 'Luz solar', value: '4' },
    { label: 'Aire', value: '5' },
    { label: 'Nutrición', value: '6' },
    { label: 'Temperancia', value: '7' },
    { label: 'Esperanza en Dios', value: '8' },
  ];
  return (
    <>
    <Modal visible={visible} onRequestClose={onClose} transparent={true} animationType='slide'>
      <SafeAreaView  style={style}>
      <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Tipo de Remedio:</Text>
        <Dropdown
        data={data}
        defaultValue={type}
        // containerStyle={{ height: 40 }}
        // style={{ backgroundColor: "#fafafa" }}
        // itemStyle={{ justifyContent: "flex-start" }}
        // dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) => setType(item.value)}
        // style={styles.dropdown}
        // placeholderStyle={styles.placeholderStyle}
        // selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        // search
        // maxHeight={300}
        labelField="label"
        valueField="value"
        // placeholder="Select item"
        // searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={value}
          onChangeText={setType}
        />
        <Text style={styles.label}>Descripción - Consejo - Receta:</Text>
        <TextInput
          style={styles.input}
          placeholder="Advice"
          value={advice}
          onChangeText={setAdvice}
        />
        <Text style={styles.label}>Ruta de la Imagen:</Text>
        <TextInput
          style={styles.input}
          placeholder="Picture"
          value={picture}
          onChangeText={setPicture}
        />
        <Button title="Agregar" onPress={handleSubmit} />
      </SafeAreaView >
    </Modal>
  </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default Remedy;