import React, { useEffect, useState } from "react";
import {
  Dimensions,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function InputTask(props) {
  const navigation = useNavigation();
  let { id, intime } = props
  let hr="00:00"
  const [messageBody, setMessageBody] = useState("");
  console.log(id+" + "+hr)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const handleSubmit = async () => {
    if (messageBody === "" || !timeRegex.test(messageBody)) {
      return;
    } else {
      const response = await fetch(`https://planar-ray-386522.rj.r.appspot.com/challengetime/${id}`, {
        headers: {
          "x-api-key": "abcdef123456",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          intime: messageBody,
        }),
      });
      // const newTodo = await response.json();
      // setTodos([...todos, { ...newTodo, shared_with_id: null }]);
      navigation.navigate("Challenge")
      Keyboard.dismiss();
      setMessageBody("");
      hr=messageBody;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder={hr}
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={30}
              color={messageBody ? "black" : "#00000050"}
              style={{ paddingLeft: 1 }}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: "#00000030",
    // alignItems: "baseline",
  },
   inputContainer: {
    width: "35%",
    flexDirection: "row",
    // alignItems: "stretch",
    // justifyContent: "center",
  },
  
  containerTextInput: {
    // width: windowWidth - 100,
    width: 50,
    // width: "10%",
    borderWidth: 1,
    borderRadius: 30,
    // minHeight: 45,
    paddingHorizontal: 5,
    // paddingTop: 8,
    fontSize: 16,
    // paddingVertical: 5,
    borderColor: "lightgray",
    backgroundColor: "#ffb",
    // marginBottom: 5,
    // fontWeight: "600",
  },
});
