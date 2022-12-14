import { useEffect, useState, useLayoutEffect } from "react";
import {
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CategoryScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, [1]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Categories",
    });
  }, [navigation]);

  const getAllCategory = () => {
    fetch("menu/category");
  };

  useEffect(() => {
    if (result) {
      setCategories(result);
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`bg-[#F9F9F9] flex-1 relative`}>
      <View style={tw`absolute bottom-0 right-0 z-20`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditCategoryScreen");
          }}
        >
          <Ionicons name="add-circle" size={52} color="#640100" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 mx-2 mt-5 relative`}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getAllCategory} />
          }
        >
          {categories?.map((x, i) => {
            return (
              <View
                key={i}
                style={tw`shadow-md bg-[#F9F9F9] mx-2 my-1 items-center`}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditCategoryScreen", {
                      category: x,
                      goBackHandler: getAllCategory,
                    });
                  }}
                  style={tw`px-4 py-6`}
                >
                  <View style={tw`flex flex-row justify-between items-center`}>
                    <Text style={tw`text-5 font-thin`}>{x.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
