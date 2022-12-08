import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { loaded, loading, error, fetch, result } = useFetch();
  const [data, setData] = React.useState(null);
  const [infoClicked, setInfoClicked] = React.useState(false);

  React.useEffect(() => {
    fetch("table/" + item);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `Table ${item}`,
    });
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log(error);
      }
      if (result) {
        setData(result);
      }
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`w-full h-full`}>
      {loading && !loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={tw`w-full h-full`}
        />
      ) : (
        <>
          <View style={tw`w-full h-full`}>
            <View style={tw`flex-row items-center justify-evenly`}>
              <Text style={tw`text-center font-bold`}>
                Table For {data?.user.firstName + " " + data?.user.lastName}
              </Text>
              <Ionicons
                name="information-circle"
                size={24}
                color="blue"
                onPress={() => setInfoClicked(!infoClicked)}
              />
            </View>
            {data?.order && <Text>There is order</Text>}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
