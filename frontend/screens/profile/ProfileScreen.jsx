import { Text, Alert, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { fetch, loading, loaded, result } = useFetch();

  const onResetDrinks = () => fetch("menu/drink/reset");

  useEffect(() => {
    if (result) {
      Alert.alert("Success", result);
    }
  }, [loaded]);

  return (
    <SafeAreaView>
      <Text>Hey</Text>

      <TouchableOpacity
        style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={!loading && onResetDrinks}
      >
        {loading ? <ActivityIndicator /> : <Text>Reset Drink Prices</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
