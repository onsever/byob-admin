import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { loaded, loading, error, fetch, result } = useFetch();
  const [data, setData] = React.useState(null);

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
            <Text style={tw`text-center`}>
              Table For {data?.user.firstName + " " + data?.user.lastName}
            </Text>
            {data?.order && <Text>There is order</Text>}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
