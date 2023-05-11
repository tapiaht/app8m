import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { Challenge_STORAGE } from "../utils/constants";

export async function getTasksChallengeApi() {
  try {
    const response = await AsyncStorage.getItem(Challenge_STORAGE);
    
    return JSON.parse(response || "[]");
    // return response ? JSON.parse(response) : [];
  } catch (error) {
    throw error;
  }
}

export async function addTaskChallengeApi(id) {
  try {
    const Challenges = await getTasksChallengeApi();
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
