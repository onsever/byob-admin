import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import { usePost } from "../../hooks/usePost";

export default function EditDrinkScreen({ navigation, route }) {
  const prevDrink = route.params?.drink;
  const fetchCategory = useFetch();
  const postDrink = usePost();
  const [drink, setDrink] = useState(
    prevDrink || {
      title: "",
      price: null,
      guranteedPrice: null,
      category: "",
    }
  );

  useEffect(() => {
    fetchCategory.fetch("menu/category");
  }, []);

  useEffect(() => {
    if (postDrink.error) {
      console.log("Error on post drink", postDrink.error);
      Alert.alert("Failed", postDrink.error.data || postDrink.error);
    }

    if (postDrink.result) {
      Alert.alert("Success", postDrink.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [postDrink.loaded]);

  return (
    <SafeAreaView>
      <Text>{prevDrink ? "Edit" : "Add"} Drink</Text>
      <TextInput
        placeholder="Title"
        value={drink.title}
        onChangeText={(text) => setDrink({ ...drink, title: text })}
      />
      <TextInput
        placeholder="Price"
        keyboardType="number-pad"
        value={drink.price}
        onChangeText={(text) => setDrink({ ...drink, price: text })}
      />
      <TextInput
        placeholder="Guaranteed Price"
        keyboardType="number-pad"
        value={drink.guranteedPrice}
        onChangeText={(text) => setDrink({ ...drink, guranteedPrice: text })}
      />
      {fetchCategory.loaded && (
        <Picker
          selectedValue={drink.category}
          onValueChange={(itemValue, itemIndex) =>
            setDrink({ ...drink, category: itemValue })
          }
        >
          {fetchCategory.result.map((x, i) => {
            return <Picker.Item label={x.name} value={x._id} />;
          })}
        </Picker>
      )}

      <TouchableOpacity
        style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={() => {
          postDrink.post("menu/drink", drink);
        }}
      >
        {postDrink.loading ? (
          <ActivityIndicator />
        ) : (
          <Text>{prevDrink ? "Edit" : "Add"} Drink</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}