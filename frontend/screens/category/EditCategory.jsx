import { useEffect, useState, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  SafeAreaView,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { usePost } from "../../hooks/usePost";
import { useDelete } from "../../hooks/useDelete";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

export default function EditCategoryScreen({ navigation, route }) {
  const prevCategory = route.params?.category;
  const postCategory = usePost();
  const deleteCategory = useDelete();
  const [category, setCategory] = useState(
    prevCategory || {
      name: "",
      isDrink: true,
    }
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Category",
    });
  }, [navigation]);

  useEffect(() => {
    if (postCategory.error) {
      console.log("Error on post category", postCategory.error);
      Alert.alert("Failed", postCategory.error.data || postCategory.error);
    }

    if (postCategory.result) {
      Alert.alert("Success", postCategory.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [postCategory.loaded]);

  useEffect(() => {
    if (deleteCategory.error) {
      console.log("Error on post category", deleteCategory.error);
      Alert.alert("Failed", deleteCategory.error.data || deleteCategory.error);
    }

    if (deleteCategory.result) {
      Alert.alert("Success", deleteCategory.result.data);
      route.params?.goBackHandler();
      navigation.goBack();
    }
  }, [deleteCategory.loaded]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`mx-10 my-5`}>
        <View style={tw`items-center mb-5`}>
          <Text style={tw`font-bold text-5`}>
            {prevCategory ? "Edit" : "Add"} Category
          </Text>
        </View>
        <View style={tw`flex flex-col mb-3`}>
          <Text style={tw`mb-4`}>Category Name</Text>
          <TextInput
            placeholder="Title"
            value={category.name}
            onChangeText={(text) => setCategory({ ...category, name: text })}
            style={tw`border px-4 py-3 rounded-lg border-[#C5C5C5] font-thin`}
          />
        </View>
        <View style={tw`flex flex-row justify-center items-center mt-5`}>
          <TouchableOpacity
            style={tw`mr-5`}
            onPress={() => {
              if (category.name) postCategory.post("menu/category", category);
            }}
          >
            {postCategory.loading ? (
              <ActivityIndicator />
            ) : (
              <View>
                {prevCategory ? (
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

          {category._id ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete category",
                  "Are you sure you wan to delete this category?",
                  [
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () =>
                        deleteCategory.doDelete(
                          "menu/category/" + category._id
                        ),
                    },
                    {
                      text: "Cancel",
                    },
                  ]
                );
              }}
            >
              {deleteCategory.loading ? (
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
