import { API_HOST } from "../utils/constants";

export async function getTasksApi(endpointUrl) {
  try {
    // const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    // const url = `${API_HOST}/users/1`;+
    const url = `${API_HOST}/todos`;
    // const response = await fetch(endpointUrl || url);
    const response = await fetch(url);
    const result = await response.json();
     console.log("Task "+JSON.stringify(result))
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTaskDetailsByUrlApi(url) {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getTaskDetail(id) {
  try {
    const url = `${API_HOST}/todos/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getTaskDetailsApi(id) {
  try {
    // const url = `${API_HOST}/todosuser/${id}`;+
    const url = `${API_HOST}/todos/${id}`;
    // const url = `${API_HOST}/pokemon/${id}`;
    // const url = `${API_HOST}/1}`;
    const response = await fetch(url);
    // console.log(response.statusText)
    const result = await response.json();
    console.log("🥰 "+result)
    return result
    
  } catch (error) {
    throw error;
  }
}

export async function addTaskApi(result) {
  if (!result) {
    return;
  } else {
    const url=`${API_HOST}/todo/`
    const response = await fetch(url, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: result.title,
        type: result.type,
        advice: result.advice,
        picture:result.picture,
      }),
    });
    const newTask = await response.json();
    return newTask
  }
}
