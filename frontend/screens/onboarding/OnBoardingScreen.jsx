import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import tw from "twrnc";
import { Audio } from 'expo-av';
export default function OnBoardingScreen({ navigation }) {

  const [sound, setSound] = React.useState();


  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../../assets/Beer.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  React.useEffect(() => {
    // write your code here, it's like componentWillMount
    playSound();
  }, [1])

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