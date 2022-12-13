import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import { usePost } from "../../hooks/usePost";
import { useDelete } from "../../hooks/useDelete";

export default function EditFoodScreen({ navigation, route }) {
  const prevFood = route.params?.food;
  const postFood = usePost();
  const deleteFood = useDelete();
  const [food, setFood] = useState(
    prevFood || {
      title: "",
      price: null,
    }
  );

  useEffect(() => {
    if (postFood.error) {
      console.log("Error on post food", postFood.error);
      Alert.alert("Failed", postFood.error.data || postFood.error);
    }

    if (postFood.result) {
      Alert.alert("Success", postFood.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [postFood.loaded]);

  useEffect(() => {
    if (deleteFood.error) {
      console.log("Error on post food", deleteFood.error);
      Alert.alert("Failed", deleteFood.error.data || deleteFood.error);
    }

    if (deleteFood.result) {
      Alert.alert("Success", deleteFood.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [deleteFood.loaded]);

  return (
    <SafeAreaView>
      <Text>{prevFood ? "Edit" : "Add"} Food</Text>
      <TextInput
        placeholder="Title"
        value={food.title}
        onChangeText={(text) => setFood({ ...food, title: text })}
      />
      <TextInput
        placeholder="Price"
        keyboardType="number-pad"
        value={food.price}
        onChangeText={(text) => setFood({ ...food, price: text })}
      />

      <TouchableOpacity
        style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={() => {
          postFood.post("menu/food", food);
        }}
      >
        {postFood.loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "white" }}>
            {prevFood ? "Edit" : "Add"} Food
          </Text>
        )}
      </TouchableOpacity>

      {food._id ? (
        <TouchableOpacity
          style={{ backgroundColor: "red", padding: 10, margin: 10 }}
          onPress={() => {
            Alert.alert(
              "Delete food",
              "Are you sure you wan to delete this food?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => deleteFood.doDelete("menu/food/" + food._id),
                },
                {
                  text: "Cancel",
                },
              ]
            );
          }}
        >
          {deleteFood.loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: "white" }}>Delete</Text>
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
