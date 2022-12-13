import { useEffect, useState } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "../../hooks/useFetch";

export default function CategoryScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, [1]);

  const getAllCategory = () => {
    fetch("menu/category");
  };

  useEffect(() => {
    if (result) {
      setCategories(result);
    }
  }, [loaded]);

  return (
    <SafeAreaView>
      <Text>Category</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditCategoryScreen");
        }}
      >
        <Text>Add Category</Text>
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllCategory} />
        }
      >
        {categories?.map((x) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditCategoryScreen", {
                  category: x,
                  goBackHandler: getAllCategory,
                });
              }}
              style={{ backgroundColor: "pink", padding: 10, margin: 10 }}
            >
              <Text>{x.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
