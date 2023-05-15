import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  addTaskChallengeApi,
  isTaskChallengeApi,
  removeTaskChallengeApi,
} from "../../api/challenge";

export default function Challenge(props) {
  const { id } = props;
  const [isChallenge, setIsChallenge] = useState(undefined);
  const [reloadCheck, setReloadCheck] = useState(false);
  const Icon = isChallenge ? FontAwesome : FontAwesome5;
  console.log("task challenge id ",id)
  useEffect(() => {
    (async () => {
      try {
        const response = await isTaskChallengeApi(id);
        setIsChallenge(response);
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
      await addTaskChallengeApi(id);
      onReloadCheckChallenge();
    } catch (error) {
      console.log(error);
    }
  };

  const removeChallenge = async () => {
    try {
      await removeTaskChallengeApi(id);
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
