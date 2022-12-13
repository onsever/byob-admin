import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Text>Hey</Text>
      <TouchableOpacity style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={() => {
          dispatch(logout())
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
