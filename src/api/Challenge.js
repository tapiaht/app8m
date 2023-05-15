import { API_HOST } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { Challenge_STORAGE } from "../utils/constants";
import { getTaskDetailsApi } from  "./task";

export async function getTasksChallengeApi(id) {
  try {
    const url = `${API_HOST}/challengeuser/${id}`;
    const response = await fetch(url);
    // console.log(response.status);
    const result = await response.json();
    // console.log("api challenge.js get "+result)
    return result
  } catch (error) {
    throw error;
  }
}

export async function addTaskChallengeApi(id,idu) {
  try {
    
    // const rtodo = await getTaskDetailsApi(id);
    // // const resulta = await rtodo.json();
    // console.log("🌬️ "+rtodo.id)

    const url = `${API_HOST}/challenge`;
    const response = await fetch(url, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        todo_id:id,
        user_id:idu,
      }),
    });
    console.log(response.status);
    const result = await response.json();
    return result
  } catch (error) {
    throw error;
  }
}

export async function isTaskChallengeApi(idu,id) {
  
    const url=`${API_HOST}/challengeuser/${idu}/${id}`
    const response = await fetch(url);
    // const result = await response.json();
    // if (response.message === "Nofound") {return;}
    return response
}

export async function removeTaskChallengeApi(id) {
  try {

    const url=`${API_HOST}/challenge/${id}`
    const response = await fetch(url, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    // const data = await response.json();
    console.log("no borra"+id);
  } catch (error) {
    throw error;
  }
}
