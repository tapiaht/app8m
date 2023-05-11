import { API_HOST } from "../utils/constants";

export async function getTasksApi(endpointUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    // const url = `${API_HOST}/todos/`;
    const response = await fetch(endpointUrl || url);
    const result = await response.json();

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

export async function getTaskDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    // const url = `${API_HOST}/todos/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
