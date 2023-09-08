import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, View, StyleSheet  } from "react-native";
import { getTasksApi } from "../api/task";
import TaskList from "../components/TaskList";
import Remedy from "./Remedy";
import { useIsFocused } from "@react-navigation/native";

export default function Advice() {
  const [Tasks, setTasks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      await loadTasks();
    })();
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const response = await getTasksApi(nextUrl);
      console.log("🤩 "+response)
      const TasksArray = [];
      for await (const task of response) {
        TasksArray.push({
          id: task.id,
          name: task.title,
          type: task.name,
          image:task.picture
        });
      }
      setTasks([...TasksArray]);
    } catch (error) {
      console.error(error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (data) => {
    // Realiza las acciones necesarias con los datos ingresados
    console.log(data);
    // Cierra el formulario modal
    setModalVisible(false);
    loadTasks();
  };
  return (
    <SafeAreaView style={styles.container}>
      <TaskList
        Tasks={Tasks}
        loadTasks={loadTasks}
        isNext={nextUrl}
      />
      <Button
        title="Crear Remedio"
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.floatingButton}
      />
     <Remedy
        visible={modalVisible}
        setModalVisible={setModalVisible}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}

        style={styles.remedy}
      />
         

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    position:"relative"
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  remedy: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
});