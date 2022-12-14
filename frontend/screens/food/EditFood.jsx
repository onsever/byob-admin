import { useEffect, useState, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  SafeAreaView,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useFetch } from "../../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import { usePost } from "../../hooks/usePost";
import { useDelete } from "../../hooks/useDelete";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: food.title || "Add Food",
    });
  }, [navigation]);

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
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`mx-10 my-5`}>
        <View style={tw`items-center mb-3`}>
          <Text style={tw`font-bold text-5`}>
            {prevFood ? "Edit" : "Add"} Food
          </Text>
        </View>
        <View style={tw`flex flex-col mb-3`}>
          <Text style={tw`mb-2 `}>Food Name</Text>
          <TextInput
            placeholder="Title"
            value={food.title}
            onChangeText={(text) => setFood({ ...food, title: text })}
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-col mb-3`}>
          <Text style={tw`mb-2 `}>Price</Text>
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={food.price}
            onChangeText={(text) => setFood({ ...food, price: text })}
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-row justify-center items-center mt-5`}>
          <TouchableOpacity
            onPress={() => {
              if (food.title && food.price) postFood.post("menu/food", food);
            }}
            style={tw`mr-5`}
          >
            {postFood.loading ? (
              <ActivityIndicator />
            ) : (
              <View>
                {prevFood ? (
                  <FontAwesome
                    name="pencil-square-o"
                    size={34}
                    color="#808080"
                  />
                ) : (
                  <FontAwesome name="plus-circle" size={34} color="#640100" />
                )}
              </View>
            )}
          </TouchableOpacity>

          {food._id ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete food",
                  "Are you sure you wan to delete this food?",
                  [
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () =>
                        deleteFood.doDelete("menu/food/" + food._id),
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
                <FontAwesome name="trash-o" size={34} color="red" />
              )}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
