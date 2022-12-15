import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import Input from "../../components/Input";
import { usePost } from "../../hooks/usePost";
import { login } from "../../redux/features/authSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { post, loading, loaded, result, error } = usePost();

  useEffect(() => {
    if (loaded) {
      if (error) {
        console.log("error", error);
        Alert.alert("Authentication Failed", error.data);
      } else if (result) {
        let data = result.data;
        dispatch(login(data));
      }
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Image
        source={require("../../assets/loginBackground.png")}
        style={tw`w-full h-90`}
      />
      <View style={tw`pr-10 pl-10 mt-5`}>
        <View style={tw`items-center mb-5`}>
          <Text style={tw`text-10 mb-2 font-bold`}>Wine and Dine!</Text>
          <Text>Life's A Party! Are you ready?</Text>
        </View>

        <View style={tw`flex flex-row justify-between mb-5`}></View>
        <View style={tw`flex flex-col`}>
          <Input
            inputStyles={"h-11 text-center mb-5"}
            placeholder={`Business Name`}
            val={form.username}
            onAction={(text) => setForm({ ...form, username: text })}
          />
          <Input
            inputStyles={"h-11 text-center"}
            placeholder={`Enter Your Password`}
            secure={true}
            val={form.password}
            onAction={(text) => setForm({ ...form, password: text })}
          />

          <TouchableOpacity
            style={tw`flex flex-row justify-center items-center`}
            onPress={() => {
              console.log(("form", form));
              post("auth/login", form);
            }}
          >
            <Image source={require("../../assets/wine_glass.png")} />
            <Text style={tw`text-[#640100] mt-12 ml-[-5%]`}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
