import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getTaskDetailsApi } from "../api/Task";
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Challenge id={Task?.id} />,
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
        const response = await getTaskDetailsApi(params.id);
        setTask(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!Task) return null;

  return (
    <ScrollView>
      <Header
        name={Task.name}
        order={Task.order}
        image={Task.sprites.other["official-artwork"].front_default}
        type={Task.types[0].type.name}
      />
      <Type types={Task.types} />
      <Stats stats={Task.stats} />
    </ScrollView>
  );
}
