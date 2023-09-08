import React, { useState, useEffect } from "react";
import { ScrollView,Text, StyleSheet  } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getTaskDetail } from "../api/task";
import Header from "../components/Task/Header";
import Type from "../components/Task/Type";
import Stats from "../components/Task/Stats";
import Challenge from "../components/Task/Challenge";
import useAuth from "../hooks/useAuth";

export default function Task(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [Task, setTask] = useState(null);
  const { auth } = useAuth();
  console.log("Task.js params vacio? > "+Object.entries(params))
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Challenge id={Task?.id} idu={auth.id} />,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, Task]);

  useEffect(() => {
    (async () => {
      try {
        // console.log("params.id "+params.id)
        // const response = await getTaskDetailsApi(params.id);
        const response = await getTaskDetail(params.id);
        console.log("🍏  screen task.js params " +JSON.stringify(response))
        setTask(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  // const data = JSON.parse(JSON.stringify(Task));
  // console.log(data);
  // console.log("🧺 "+JSON.stringify(Task.name))
  if (!Task) return null;
  const tipo=Task.name.split(' ')[0]
  return (
    <ScrollView>
      <Header
        // name={Task.title}
        id={Task.id}
        name={Task.title}
        // order={Task.order}
        // image={Task.sprites.other["official-artwork"].front_default}
        // type={Task.types[0].type.name}
        // type={tipo.slice(2)}
        image={Task.picture}
        type={Task.name}
        // intime={Task.intime}
      />
      <Text style={styles.largeText}> {Task.advice} </Text>
      {/* <Type types={Task.types} /> */}
      {/* <Stats stats={Task.stats} /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  largeText: {
    paddingTop:10,
    fontSize: 20, // Tamaño de fuente de 20 puntos
  },
});