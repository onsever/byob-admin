import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={{ backgroundColor: 'pink', padding: 10 }} onPress={() => dispatch(logout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
