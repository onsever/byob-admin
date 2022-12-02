import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import tw from "twrnc";

export default function OnBoardingScreen({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <Image
        source={require("../../assets/Logo_lightMode.png")}
        style={{ width: 350, height: 350 }}
      />
    </SafeAreaView>
  );
}