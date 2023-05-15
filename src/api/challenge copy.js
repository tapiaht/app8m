import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { Challenge_STORAGE } from "../utils/constants";

export async function getTasksChallengeApi() {
  try {
    const response = await AsyncStorage.getItem(Challenge_STORAGE);
    // console.log(JSON.stringify(response.json()))
    const result=JSON.parse(response || "[]");
    console.log("api challenge.js get_STORAGE "+result)
    return result

  } catch (error) {
    throw error;
  }
  // try {
  //   const response = await AsyncStorage.getItem(Challenge_STORAGE);
  //   console.log("😎 api challenge "+JSON.stringify(response.json()))
  //   return JSON.parse(response || "[]");
  // } catch (error) {
  //   throw error;
  // }
}

export async function addTaskChallengeApi(id) {
  try {
    const Challenges = await getTasksChallengeApi();
    console.log("Challenge.j add id"+Challenges.id)
    Challenges.push(id);
    await AsyncStorage.setItem(Challenge_STORAGE, JSON.stringify(Challenges));
  } catch (error) {
    throw error;
  }
}

export async function isTaskChallengeApi(id) {
  try {
    const response = await getTasksChallengeApi();
    return includes(response, id);
  } catch (error) {
    throw error;
  }
}

export async function removeTaskChallengeApi(id) {
  try {
    const Challenges = await getTasksChallengeApi();
    const newChallenges = pull(Challenges, id);
    await AsyncStorage.setItem(Challenge_STORAGE, JSON.stringify(newChallenges));
  } catch (error) {
    throw error;
  }
}
