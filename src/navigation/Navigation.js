import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import ChallengeNavigation from "./ChallengeNavigation";
import AdviceNavigation from "./AdviceNavigation";
import AccountNavigation from "./AccountNavigation";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName="Account">
      <Tab.Screen
        name="Challenge"
        component={ChallengeNavigation}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Advice"
        component={AdviceNavigation}
        // options={{
        //   tabBarLabel: "",
        //   tabBarIcon: () => renderPokeball(),
        // }}
        options={{
          tabBarLabel: "Consejos",
          tabBarIcon: ({ color, size }) => (
            <Icon name="lightbulb" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: "Mi cuenta",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function renderPokeball() {
  return (
    <Image
      source={require("../assets/pokeball.png")}
      style={{ width: 75, height: 75, top: -15 }}
    />
  );
}
