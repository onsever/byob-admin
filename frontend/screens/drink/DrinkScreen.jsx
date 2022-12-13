import { useEffect, useState } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../hooks/useFetch";

export default function DrinkScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("menu/drink/all");
  }, []);

  const goBackHandler = () => {
    fetch("menu/drink/all");
  };

  useEffect(() => {
    if (result) {
      setDrinks(result);
    }
  }, [loaded]);

  return (
    <SafeAreaView>
      <Text>Drink</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditDrinkScreen");
        }}
      >
        <Text>Add Drink</Text>
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={goBackHandler} />
        }
      >
        {drinks?.map((x) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditDrinkScreen", {
                  drink: x,
                  goBackHandler: goBackHandler,
                });
              }}
              style={{ backgroundColor: "pink", padding: 10, margin: 10 }}
            >
              <Text>
                {x.title} - ${x.price}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
