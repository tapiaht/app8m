import React, { useState, useCallback } from "react";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTasksChallengeApi } from "../api/challenge";
import { getTaskDetailsApi } from "../api/task";
// import { getTaskDetail } from "../api/task";
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
          console.log("😁 llegue")
          const response = await getTasksChallengeApi();
          console.log("challenge screen "+response)

          const TasksArray = [];
          for await (const id of response) {
            
            console.log("🏄‍♀️ for "+id)
            
            // const TaskDetails = await getTaskDetail(id);+
            const TaskDetails = await getTaskDetailsApi(id);
            // const tipo=TaskDetails.title.split(' ')[0]
            TasksArray.push({
              id: TaskDetails.id,
              // title: TaskDetails.title,
              name: TaskDetails.title,
              // type: TaskDetails.types[0].type.name,
              // type: tipo.slice(2)
              type: TaskDetails.type,
              // order: TaskDetails.order,
              // image:
              //   TaskDetails.sprites.other["official-artwork"].front_default,
              image:TaskDetails.picture,
            });
          }

          setTasks(TasksArray);
        })();
      }
    }, [auth])
  );

  return !auth ? <NoLogged /> : <TaskList Tasks={Tasks} />;
}
