import { useEffect, useState } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../hooks/useFetch";

export default function FoodScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getAllFood();
  }, [1]);

  const getAllFood = () => {
    fetch("menu/food");
  };

  useEffect(() => {
    if (result) {
      setFoods(result);
    }
  }, [loaded]);

  return (
    <SafeAreaView>
      <Text>Food</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditFoodScreen");
        }}
      >
        <Text>Add Food</Text>
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllFood} />
        }
      >
        {foods?.map((x) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditFoodScreen", {
                  food: x,
                  goBackHandler: getAllFood,
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
