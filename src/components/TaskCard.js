import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";
import getColorByTaskType from "../utils/getColorByTaskType";

export default function TaskCard(props) {
  const { Task } = props;
  const navigation = useNavigation();
  const tipo=Task.type.split(' ')[0]
  console.log("🥧TaskCard.js goToTask id "+Task.type)
  const TaskColor = getColorByTaskType(tipo.slice(2));
  const bgStyles = { backgroundColor: TaskColor, ...styles.bgStyles };

  const goToTask = () => {
    // console.log("🥧TaskCard.js goToTask id "+Task.id)
    navigation.navigate("Task", { id: Task.id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToTask}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
          {/* <View > */}
            <Text style={styles.number}>
              {/* #{`${Task.order}`.padStart(3, 0)} */}
            </Text>
            {/* <Text style={styles.name}>{capitalize(Task.title)} {Task.intime}</Text> */}
            <Text style={styles.name}>{Task.type}:{capitalize(Task.name)}</Text>
            <Image source={{ uri: Task.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 110,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 2,
    paddingRight: '30%',
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
