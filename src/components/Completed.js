import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput 
} from "react-native";
import { useRef, useState } from "react";
import PickTime from "./PickTime";
import InputTask from "./InputTask";

function CheckMark({ id, completed, toggleTodo }) {
  async function toggle() {
    // const response = await fetch(`http://192.168.100.209:8080/challenge/${id}`, {
    const response = await fetch(`https://massive-team-397902.rj.r.appspot.com/challenge/${id}`, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  );
}

export default function Task({
  id,
  name,
  type,
  intime,
  completed,
  clearTodo,
  toggleTodo,
}) {
  const [isDeleteActive, setIsDeleteActive] = React.useState(false);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "48%", "75%"];

  // console.log(" 🏝️ titulo en completed.js "+name)
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  async function deleteTodo() {
    // const response = await fetch(`http://192.168.100.209:8080/challenge/${id}`, {
    const response = await fetch(`https://massive-team-397902.rj.r.appspot.com/challenge/${id}`, {
      headers: {
        "x-api-key": "abcdef123456",
      },
      method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
  }
  const changeTime = async () => {
    try {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString();
  
      const response = await fetch(`https://massive-team-397902.rj.r.appspot.com/challengetime/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intime: currentTime,
        }),
      });
  
      if (response.ok) {
        // La solicitud se realizó correctamente
        console.log("correcto")
        // PickTime()
      } else {
        // La solicitud no se realizó correctamente
        console.log("no se pudo")
      }
    } catch (error) {
      // Error al realizar la solicitud
      console.log("hay un error "+error)
      // Manejar el error según sea necesario
    }
  };
  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={styles.text}>{type}: {name} {intime}</Text>
      </View>
      <InputTask id={id} intime={intime} />
      {/* <PickTime/> */}
      {isDeleteActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
        </Pressable>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 25,
    height: 25,
    borderRadius: 7,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});
