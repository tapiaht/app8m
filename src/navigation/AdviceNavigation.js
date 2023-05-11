import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdviceScreen from "../screens/Advice";
import TaskScreen from "../screens/Task";

const Stack = createStackNavigator();

export default function AdviceNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Advice"
        component={AdviceScreen}
        options={{ title: "CONSEJOS", headerTransparent: true }}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={{ title: "TAREAS", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
