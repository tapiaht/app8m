import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { getTasksApi, getTaskDetailsApi,getTaskDetailsByUrlApi } from "../api/task";
import TaskList from "../components/TaskList";

export default function Advice() {
  const [Tasks, setTasks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    (async () => {
      await loadTasks();
    })();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasksApi(nextUrl);
      // console.log("🛏️"+response)
      const data =JSON.parse(JSON.stringify(response));
      // console.log(data.id)
      setNextUrl(response);
      console.log("🤩 "+response)
      // setNextUrl(response.next);*
      const TasksArray = [];
      // const TaskDetails = await getTaskDetailsApi(data.id);+
      for await (const task of response) {
      // for await (const task of TaskDetails) {+
        // const TaskDetails = await getTaskDetailsByUrlApi(task.url);*
        const TaskDetails = await getTaskDetailsApi(task.id);
        // console.log("task id "+task.id)
        // console.log("task id "+TaskDetails.id)*
        // console.log(TaskDetails);*
        // const result = TaskDetails.json();
        // const tipo=task.name.split(' ')[0]
        // console.log("title task "+tipo.slice(2))
        TasksArray.push({
          id: task.id,
          name: task.title,
          // id: TaskDetails.id,
          // name: TaskDetails.name,
          // type: TaskDetails.types[0].type.name,
          intime:task.intime,
          // type: tipo.slice(2),
          type: task.name,
          // order: TaskDetails.order,
          // image: TaskDetails.sprites.other["official-artwork"].front_default,
          image:TaskDetails.picture
        });
      }

      // setTasks([...Tasks, ...TasksArray]);*
      setTasks([...TasksArray]);
      console.log(TasksArray[1])
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <TaskList
        Tasks={Tasks}
        loadTasks={loadTasks}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}
