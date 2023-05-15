import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  addTaskChallengeApi,
  isTaskChallengeApi,
  removeTaskChallengeApi,
} from "../../api/challenge";

export default function Challenge(props) {
  const { id,idu } = props;
  const [isChallenge, setIsChallenge] = useState(undefined);
  const [reloadCheck, setReloadCheck] = useState(false);
  const [idChallenge, setIdChallenge] = useState(undefined);
  const Icon = isChallenge ? FontAwesome : FontAwesome5;
  console.log("task is challenge? ",isChallenge)
  useEffect(() => {
    (async () => {
      try {
        const response = await isTaskChallengeApi(idu,id);
        const result = await response.json();
        // console.log(Object.entries(result.id).id)
        console.log("😈 id reto "+result.id)
        setIdChallenge(result.id)
        console.log(response.status)

        if (response.status===404)
        {console.log("❤️ "+response)
        setIsChallenge(false);
        }
        else{
          setIsChallenge(true);
          
        }
      } catch (error) {
        setIsChallenge(false);
      }
    })();
  }, [id, reloadCheck]);

  const onReloadCheckChallenge = () => {
    setReloadCheck((prev) => !prev);
  };

  const addChallenge = async () => {
    try {
      await addTaskChallengeApi(id,idu);
      onReloadCheckChallenge();
    } catch (error) {
      console.log(error);
    }
  };

  const removeChallenge = async () => {
    try {
      console.log("🌞 idch "+idChallenge)
      await removeTaskChallengeApi(idChallenge);
      onReloadCheckChallenge();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      onPress={isChallenge ? removeChallenge : addChallenge}
      style={{ marginRight: 20 }}
    />
  );
}
