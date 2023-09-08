import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_HOST } from "../utils/constants";
import { includes, pull } from "lodash";
// import { Challenge_STORAGE } from "../utils/constants";

export async function getUsersApi(email) {
  try {
    const url = `${API_HOST}/user/`+email;
    const response = await fetch(url);
    const result = await response.json();
    console.log("api users.js get "+result)
    return result
  } catch (error) {
    throw error;
  }
}

export async function addUsersApi(result) {
  if (!result) {
    return;
  } else {
    const url=`${API_HOST}/users/`
    const response = await fetch(url, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: result.name,
        email: result.email,
        picture:result.picture,
      }),
    });
    const newUser = await response.json();
    return newUser
  }
}

