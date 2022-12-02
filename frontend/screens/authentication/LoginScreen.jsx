import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Input from "../../components/Input";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Image
        source={require("../../assets/loginBackground.png")}
        style={tw`w-full h-90`}
      />
      <View style={tw`pr-10 pl-10 mt-5`}>
        <View style={tw`items-center mb-5`}>
          <Text style={tw`text-10 mb-2 text-bold`}>Wine and Dine!</Text>
          <Text>Life's A Party! Are you ready?</Text>
        </View>

        <View style={tw`flex flex-row justify-between mb-5`}></View>
        <View style={tw`flex flex-column`}>
          <Input
            inputStyles={"h-11 text-center mb-5"}
            placeholder={`Business Name`}
            onAction={(text) => console.log(text)}
          />
          <Input
            inputStyles={"h-11 text-center"}
            placeholder={`Enter Your Password`}
            secure={true}
            onAction={(text) => console.log(text)}
          />

          <TouchableOpacity
            style={tw`flex flex-row justify-center align-center`}
          >
            <Image source={require("../../assets/wine_glass.png")} />
            <Text style={tw`text-[#640100] mt-12 ml-[-5%]`}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
