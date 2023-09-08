import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChallengeScreen from "../screens/Challenge";
import TaskScreen from "../screens/Task";

const Stack = createStackNavigator();

export default function ChallengeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{ title: "RETOS DEL DÍA: Se sugiere agregar 8 remedios" }}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
