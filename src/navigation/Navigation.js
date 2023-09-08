import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import ChallengeNavigation from "./ChallengeNavigation";
import AdviceNavigation from "./AdviceNavigation";
import AccountNavigation from "./AccountNavigation";
import useAuth from "../hooks/useAuth";
const Tab = createBottomTabNavigator();

export default function Navigation() {
  
  return (
    <Tab.Navigator initialRouteName="Account">
      <Tab.Screen
        name="Challenge"
        component={ChallengeNavigation}
        options={{
          tabBarLabel: "Retos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Advice"
        component={AdviceNavigation}
        options={{
          tabBarLabel: "Remedios",
          tabBarIcon: () => renderIcon(),
        }}
        // options={{
        //   tabBarLabel: "8 Remedios",
        //   tabBarIcon: ({ color, size }) => (
        //     <Icon name="lightbulb" color={color} size={size} />
        //   ),
        // }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        // options={{
        //   tabBarLabel: "Perfil",
        //   tabBarIcon: ({ color, size }) => (
        //     <Icon name="user" color={color} size={size} />
        //   ),
        // }}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: () => renderPicture(),
        }}
      />
    </Tab.Navigator>
  );
}

function renderIcon() {
  return (
    <Image
      source={require("../assets/eigth.png")}
      style={{ width: 40, height: 40 }}
    />
  );
}
  function renderPicture() {
    const { auth } = useAuth();
    let url=''
    if (auth) {url={ uri: auth?.picture }} else {url=require("../assets/nohay.png")}
    return (
      <Image
        source={url}
        style={{ width: 40, height: 40,  borderRadius: 45 }}
      />
    );
}
