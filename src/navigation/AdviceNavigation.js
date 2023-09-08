import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdviceScreen from "../screens/Advice";
import TaskScreen from "../screens/Task";
import Remedy from "../screens/Remedy";

const Stack = createStackNavigator();

export default function AdviceNavigation() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Advice"
        component={AdviceScreen}
        options={{ title: "Elige algunos de los 8 remedios", headerTransparent: true }}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={{ title: "Tus retos", headerTransparent: true }}
      />
      <Stack.Screen
        name="NewRemedie"
        component={Remedy}
        options={{ title: "Nuevo Remedio" }}
      />
    </Stack.Navigator>
  );
}
