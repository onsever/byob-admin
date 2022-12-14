import { useEffect, useState } from "react";
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
    <SafeAreaView style={tw`bg-[#F9F9F9] flex-1 relative`}>
      <View style={tw`absolute bottom-0 right-0`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditFoodScreen");
          }}
          style={tw``}
        >
          <Ionicons name="add-circle" size={52} color="#640100" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 mx-10`}>
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
                style={tw`px-4 py-6 border-b border-[#D3D3D3]`}
              >
                <View style={tw`flex flex-row justify-between items-center`}>
                  <Text style={tw`text-5 font-thin`}>{x.title}</Text>
                  <Text style={tw`font-thin`}>${x.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
