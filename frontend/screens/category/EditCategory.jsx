import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePost } from "../../hooks/usePost";
import { useDelete } from "../../hooks/useDelete";

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
    <SafeAreaView>
      <Text>{prevCategory ? "Edit" : "Add"} Category</Text>
      <TextInput
        placeholder="Title"
        value={category.name}
        onChangeText={(text) => setCategory({ ...category, name: text })}
      />

      <TouchableOpacity
        style={{ backgroundColor: "grey", padding: 10, margin: 10 }}
        onPress={() => {
          if (category.name) postCategory.post("menu/category", category);
        }}
      >
        {postCategory.loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "white" }}>
            {prevCategory ? "Edit" : "Add"} Category
          </Text>
        )}
      </TouchableOpacity>

      {category._id ? (
        <TouchableOpacity
          style={{ backgroundColor: "red", padding: 10, margin: 10 }}
          onPress={() => {
            Alert.alert(
              "Delete category",
              "Are you sure you wan to delete this category?",
              [
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () =>
                    deleteCategory.doDelete("menu/category/" + category._id),
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
            <Text style={{ color: "white" }}>Delete</Text>
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
