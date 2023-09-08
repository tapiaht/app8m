import { useEffect, useState } from "react";
import { Text, FlatList, SafeAreaView, StyleSheet, View,Button } from "react-native";
import InputTask from "./InputTask";
import Task from "./Completed";
import useAuth from "../hooks/useAuth"
import { useIsFocused } from "@react-navigation/native";
// import PickTime from "./PickTime";
// import { View } from "react-native-web";

export default function Reto(props) {
  const { Tasks } = props;
  const { auth } = useAuth();
  const [todos, setTodos] = useState();
  const isFocused = useIsFocused();
  // Tasks.forEach(element => {
  //   console.log("Cuantos 🍜 "+element.id)
  // })
  useEffect(() => {
    fetchTodos();
  }, [Tasks]);

  async function fetchTodos() {
    // const response = await fetch(`https://planar-ray-386522.rj.r.appspot.com/challengeuser/${auth.id}`, {
    //   headers: {
    //     "x-api-key": "abcdef123456",
    //   },
    // });
    // const data = await response.json();
    const data = await Tasks;
    // console.log("data "+data)
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    console.log("id en togle"+id)
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (data) => {
    // Realiza las acciones necesarias con los datos ingresados
    console.log(data);
    // Cierra el formulario modal
    setModalVisible(false);
    // loadTasks();
  };
  return (
      <SafeAreaView>
        
        <FlatList
          data={todos}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(todo) => todo.id}
          // keyExtractor={(Task) => String(Task.id)}
          renderItem={({ item }) => (
            <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
          )}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={() => <Text style={styles.title}>👇completa el reto  Fijar:Hora HH:mm ⏰  Activa: 👆🔔</Text>}
        />
        {/* <PickTime/> */}
        {/* <InputTask todos={todos} setTodos={setTodos} /> */}
        {/* <Button
        title="Open Form"
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.floatingButton}
      />
     <PickTime
        visible={modalVisible}
        setModalVisible={setModalVisible}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}

        style={styles.remedy}
      />    */}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#E9E9EF",
    justifyContent: 'center',
    // alignItems: 'center',
    position:"relative"
  },
  contentContainerStyle: {
    padding: 15,
    backgroundColor: "#E9E9EF",
  },
  title: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 15,
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
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
});
