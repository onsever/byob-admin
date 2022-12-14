import { useEffect, useState, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useFetch } from "../../hooks/useFetch";
import { Picker } from "@react-native-picker/picker";
import { usePost } from "../../hooks/usePost";
import { useDelete } from "../../hooks/useDelete";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

export default function EditDrinkScreen({ navigation, route }) {
  const prevDrink = route.params?.drink;
  const fetchCategory = useFetch();
  const postDrink = usePost();
  const deleteDrink = useDelete();
  const [drink, setDrink] = useState(
    prevDrink || {
      title: "",
      price: null,
      guranteedPrice: null,
      category: "",
    }
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: drink.title || "Add Drink",
    });
  }, [navigation]);

  useEffect(() => {
    fetchCategory.fetch("menu/category");
  }, [1]);

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

  useEffect(() => {
    if (deleteDrink.error) {
      console.log("Error on post drink", deleteDrink.error);
      Alert.alert("Failed", deleteDrink.error?.data || "");
    }

    if (deleteDrink.result) {
      Alert.alert("Success", deleteDrink.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [deleteDrink.loaded]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`mx-10 my-5`}>
        <View style={tw`items-center mb-3`}>
          <Text style={tw`font-bold text-5`}>
            {prevDrink ? "Edit" : "Add"} Drink
          </Text>
        </View>
        <View style={tw`flex flex-col mb-3`}>
          <Text style={tw`mb-2 `}>Drink Name</Text>
          <TextInput
            placeholder="Title"
            value={drink.title}
            onChangeText={(text) => setDrink({ ...drink, title: text })}
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-col mb-3`}>
          <Text style={tw`mb-2 `}>Price</Text>
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            value={drink.price}
            onChangeText={(text) => setDrink({ ...drink, price: text })}
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-col mb-5`}>
          <Text style={tw`mb-2 `}>Guaranteed Price</Text>
          <TextInput
            placeholder="Guaranteed Price"
            keyboardType="numeric"
            value={drink.guranteedPrice}
            onChangeText={(text) =>
              setDrink({ ...drink, guranteedPrice: text })
            }
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-col mb-5 bg-white py-4 rounded-lg`}>
          <Text style={tw`mb-2 font-thin text-4 text-center`}>
            Select Category
          </Text>
          {fetchCategory.loaded && (
            <Picker
              selectedValue={drink.category}
              onValueChange={(itemValue, itemIndex) =>
                setDrink({ ...drink, category: itemValue })
              }
            >
              {fetchCategory.result.map((x, i) => {
                return <Picker.Item key={i} label={x.name} value={x._id} />;
              })}
            </Picker>
          )}
        </View>
        <View style={tw`flex flex-row justify-center items-center`}>
          <TouchableOpacity
            style={tw`mr-5`}
            onPress={() => {
              if (
                drink.title &&
                drink.price &&
                drink.guranteedPrice &&
                drink.category
              )
                postDrink.post("menu/drink", drink);
            }}
          >
            {postDrink.loading ? (
              <ActivityIndicator />
            ) : (
              <View>
                {prevDrink ? (
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

          {drink._id ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete Drink",
                  "Are you sure you wan to delete this drink?",
                  [
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () =>
                        deleteDrink.doDelete("menu/drink/" + drink._id),
                    },
                    {
                      text: "Cancel",
                    },
                  ]
                );
              }}
            >
              {deleteDrink.loading ? (
                <ActivityIndicator />
              ) : (
                <FontAwesome name="trash-o" size={34} color="#640100" />
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