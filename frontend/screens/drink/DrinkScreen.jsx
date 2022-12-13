import { useEffect } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { logout } from "../../redux/features/authSlice";

export default function DrinkScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();

  useEffect(() => {
    fetch("menu/drink/all");
  }, [])

  return (
    <SafeAreaView>
      <Text>Drink</Text>

      {result?.map(x => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate("EditDrinkScreen", { drink: x })
          }} style={{ backgroundColor: 'pink', padding: 10, margin: 10 }}>
            <Text>{x.title}</Text>
          </TouchableOpacity>
        )
      })}

    </SafeAreaView>
  );
}
