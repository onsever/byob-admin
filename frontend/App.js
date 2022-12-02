import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/TabNavigator";
import AuthStackNavigator from "./navigators/AuthStackNavigator";

export default function App() {
  const [user, setUser] = React.useState(null);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
