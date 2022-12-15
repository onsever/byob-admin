import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function UserScreen({ navigation }) {
  const [data, setData] = React.useState(null);
  const { result, loading, error, loaded, fetch } = useFetch();

  const dateParser = (date) => {
    const dateArray = date.split("T");
    const dateArray2 = dateArray[0].split("-");
    return dateArray2[2] + "/" + dateArray2[1] + "/" + dateArray2[0];
  };

  const handleClick = (id) => {
    navigation.navigate("OrderHistoryScreen", { id });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
    });
  }, [navigation]);

  React.useEffect(() => {
    fetch("/user/all");
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log(error);
      }

      if (result) {
        setData(result);
        console.log(result);
      }
    }
  }, [loaded]);

  return (
    <View style={tw`w-full h-full`}>
      {loading && !loaded ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View>
          <Text style={tw`font-bold text-3xl my-4 px-4`}>Users List</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={tw`flex-row items-center px-4 py-2 bg-white shadow-lg mb-2`}
                  onPress={() => handleClick(item?.item._id)}
                >
                  <View>
                    <Ionicons name="person-circle" size={70} color="black" />
                  </View>
                  <View style={tw`ml-2`}>
                    <Text style={tw`text-black font-semibold uppercase`}>
                      {item?.item.firstName + " " + item?.item.lastName}
                    </Text>
                    <View style={tw`border-b h-[0.1px] w-full mb-2`}></View>
                    <Text style={tw`text-black font-semibold`}>
                      {dateParser(item?.item.dob)}
                    </Text>
                    <Text style={tw`text-gray-500`}>{item?.item.email}</Text>
                    <Text style={tw`text-gray-500`}>{item?.item.phone}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
