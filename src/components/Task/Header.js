import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import { capitalize } from "lodash";
import getColorByTaskType from "../../utils/getColorByTaskType";

export default function Header(props) {
  // const { title, order, intime, image, type } = props;
  const {name, order, image, type,intime } = props;
  console.log("header🤡"+type);
  const tipo=type.split(' ')[0]
  const color = getColorByTaskType(tipo.slice(2));
  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  return (
    <>
      <View style={bgStyle} />
      {/* <View style={styles.name} /> */}

      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          {/* <Text>{intime}</Text> */}
          {/* <Text style={styles.name}>{capitalize(title)} {intime}</Text> */}
          <Text style={styles.name}>{type} : {capitalize(name)} </Text>
          {/* <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text> */}
        </View>
        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 1,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
});
