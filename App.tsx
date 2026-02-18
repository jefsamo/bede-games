import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./src/navigation/types";
import { GameListScreen } from "./src/screens/GameListScreen";
import { GamePlayerScreen } from "./src/screens/GamePlayerScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GameList"
          component={GameListScreen}
          options={{ title: "Bede Games" }}
        />
        <Stack.Screen
          name="GamePlayer"
          component={GamePlayerScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerBackTitle: "Back",
            headerShown: true,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
