import { View, Text, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`flex-1 px-6 relative items-center`}>
      <View style={tw`items-center w-full`}>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={120} color="#640100" />
        </TouchableOpacity>
      </View>
      <View style={tw`mx-8 my-4 bg-white px-5  rounded-lg`}>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>First Name: </Text>
          <Text style={tw`text-lg`}></Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0] w-[80%]`}
        >
          <Text style={tw`font-bold text-lg`}>Last Name: </Text>
          <Text style={tw`text-lg`}></Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>Email: </Text>
          <Text style={tw`text-lg`}></Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>Phone: </Text>
          <Text style={tw`text-lg`}></Text>
        </View>
      </View>
      <View style={tw`absolute bottom-2 right-2`}>
        <TouchableOpacity
          style={tw` bg-[#640100] rounded-full p-4`}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Logout",
                style: "destructive",
                onPress: () => dispatch(logout()),
              },
              {
                text: "Cancel",
              },
            ]);
          }}
        >
          {logout().loading ? (
            <ActivityIndicator />
          ) : (
            <Ionicons name="log-out-outline" size={30} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
