import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTasksChallengeApi } from "../api/Challenge";
import { getTaskDetailsApi } from "../api/Task";
import useAuth from "../hooks/useAuth";
import TaskList from "../components/TaskList";
import NoLogged from "../components/NoLogged";

export default function Challenge() {
  const [Tasks, setTasks] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getTasksChallengeApi();
          console.log("💧🫕nose")
          const TasksArray = [];
          for await (const id of response) {
            
            const TaskDetails = await getTaskDetailsApi(1);
            console.log("🏄‍♀️ for ")

            TasksArray.push({
              id: TaskDetails.id,
              name: TaskDetails.title,
              type: TaskDetails.types[0].type.name,
              order: TaskDetails.order,
              image:
                TaskDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setTasks(TasksArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <NoLogged /> : <TaskList Tasks={Tasks} />;
}
