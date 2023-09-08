import React, { useState } from "react";
import { Modal, Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import react from "react";

export default function PickTime ({ visible,setModalVisible,onClose, onSubmit,style }) {
    const [date, setDate] = useState(new Date(1598051730000));
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
    }
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
        console.log("elige "+currentMode)
      DateTimePickerAndroid.open({
        value: date,
        display: "clock",
        onChange,
        mode: 'currentMode',
        is24Hour: true,
      });
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
    <>  
      <Modal visible={visible} onRequestClose={onClose} transparent={true} animationType='slide'>
      <SafeAreaView  style={style}>
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
        <Button onPress={showTimepicker} title="Elige la  jaja Hora!" />
        <Text>selected: {date.toLocaleString()}</Text>
      </SafeAreaView>
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
