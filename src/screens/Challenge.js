import React, { useState, useCallback,useEffect, useRef  } from "react";
import { View, Platform,Switch,StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTasksChallengeApi } from "../api/challenge";
// import { getTaskDetailsApi } from "../api/task";
import Reto from "../components/Reto"
import useAuth from "../hooks/useAuth";
// import TaskList from "../components/TaskList";
import NoLogged from "../components/NoLogged";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// import PickTime from "../components/PickTime";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Challenge() {

  const [Tasks, setTasks] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          console.log("🤑 user "+auth.id)
          const response = await getTasksChallengeApi(auth.id);
          const TasksArray = [];
          for await (const item of response) {
            console.log("🛏️ item"+item.todo_id)
            // const TaskDetails = await getTaskDetailsApi(item.todo_id);
            const TaskDetails = item;
            TasksArray.push({
              id: TaskDetails.id,
              name: TaskDetails.title,
              user:TaskDetails.user,
              type: TaskDetails.type,
              intime:TaskDetails.intime,
              inday:TaskDetails.inday,
              completed:TaskDetails.completed,
              // order: TaskDetails.order,
              image:TaskDetails.picture,
            });
          }
          setTasks(TasksArray);
        })();
      }
    }, [auth])
  );
  //notify
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {  
      console.log("😈 "+isEnabled)
      if (!isEnabled) {
        Notifications.dismissAllNotificationsAsync();
        Tasks.forEach(item => {
          const [hour, minute] = item.intime.split(':').map(Number);
          console.log(hour+":"+minute)
          schedulePushNotification(hour, minute,item.name,item.title);
        });
      }
      else Notifications.cancelAllScheduledNotificationsAsync();    
      setIsEnabled(previousState => !previousState)
    }
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
return( 
<View >
    {!auth ? <NoLogged /> :(
    <>        
      <View >
     
        {/* <Text>Your expo push token: {expoPushToken}</Text> */}
        {/* <Text>User: {Tasks[0].inday}</Text> */}
        <View style={styles.container}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      {/* <TaskList Tasks={Tasks} /> */}
      {/* <PickTime/> */}
      <Reto Tasks={Tasks}/>
    </>
  )}
</View>
)}
async function schedulePushNotification(hr,m,todo,title) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Cumple tu reto! "+todo+"📬 hr:"+hr+" min:"+m,
      body: title,
      data: { data: 'goes here' },
    },
    trigger: { 
      hour: hr,
      minute: m,
      repeats: true,
      },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end', // Alinea el switch a la derecha
    marginRight: 10, // Espacio a la derecha del switch
    backgroundColor: 'lavender'
  }
})