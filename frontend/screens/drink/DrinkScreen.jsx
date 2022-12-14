import { useEffect, useState, useLayoutEffect } from "react";
import {
  Text,
  ScrollView,
  RefreshControl,
  View,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DrinkScreen({ navigation }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getAllDrink();
  }, [1]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Drinks",
    });
  }, [navigation]);

  const getAllDrink = () => {
    fetch("menu/drink/all");
  };

  useEffect(() => {
    if (result) {
      setDrinks(result);
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`bg-[#F9F9F9] flex-1 relative`}>
      <View style={tw`absolute bottom-0 right-0`}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditDrinkScreen");
          }}
          style={tw``}
        >
          <Ionicons name="add-circle" size={52} color="#640100" />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 mx-10`}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getAllDrink} />
          }
        >
          {drinks?.map((x, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  navigation.navigate("EditDrinkScreen", {
                    drink: x,
                    goBackHandler: getAllDrink,
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
