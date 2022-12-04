import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../redux/features/authSlice";
import { getData } from "../utils/asyncStorage";
import AuthStackNavigator from "./AuthStackNavigator";

export default function RootNavigator() {
  const userLoggedIn = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      const user = await getData("user");
      if (user) dispatch(login(user));
    }
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      {userLoggedIn ? <TabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
