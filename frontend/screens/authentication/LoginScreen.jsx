import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc"

export default function LoginScreen() {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
      <Text>Login</Text>

      <TextInput placeholder="username" />
      <TextInput placeholder="password" secureTextEntry />

      <TouchableOpacity>
        <Text>Logn</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
