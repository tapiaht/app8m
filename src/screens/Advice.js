import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { getTasksApi, getTaskDetailsByUrlApi } from "../api/Task";
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
      setNextUrl(response.next);

      const TasksArray = [];
      for await (const Task of response.results) {
        const TaskDetails = await getTaskDetailsByUrlApi(Task.url);

        TasksArray.push({
          id: TaskDetails.id,
          name: TaskDetails.name,
          type: TaskDetails.types[0].type.name,
          order: TaskDetails.order,
          image: TaskDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setTasks([...Tasks, ...TasksArray]);
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
