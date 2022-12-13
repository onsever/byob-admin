import React from "react";
import {
  Alert,
  View,
  ActivityIndicator,
  SectionList,
  Text,
  Image,
} from "react-native";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";

export default function OrderHistoryScreen({ navigation, route }) {
  const [data, setData] = React.useState(null);
  const [tableData, setTableData] = React.useState(null);
  const { loading, result, error, loaded, fetch } = useFetch();
  const { id } = route.params;

  const dateParser = (date) => {
    const dateArray = date.split("T");
    const dateArray2 = dateArray[0].split("-");
    return dateArray2[2] + "/" + dateArray2[1] + "/" + dateArray2[0];
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Order History",
    });
  }, []);

  React.useEffect(() => {
    fetch(`/table/all/${id}`);
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        Alert.alert("Error", error);
        setIsDataReady(false);
      }
      if (result) {
        setData(result);
        console.log(result);
      }
    }
  }, [loaded]);

  React.useEffect(() => {
    setTableData(
      data
        ?.map((item) => {
          return {
            title: dateParser(item?.createdAt),
            data: item?.order?.concat(item?.drinkOrder),
          };
        })
        .filter((i) => i?.data !== undefined)
    );
  }, [data]);

  return (
    <View style={tw`w-full h-full items-center justify-start`}>
      {loading && !loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={tw`items-center justify-center`}
        />
      ) : (
        <View style={tw`w-full`}>
          <SectionList
            sections={tableData || []}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View
                  style={tw`flex-row items-center px-4 mb-4 bg-white shadow-md py-2`}
                >
                  <Image
                    source={{
                      uri:
                        item?.image ||
                        "https://i.ytimg.com/vi/IVM_CQvgxCg/maxresdefault.jpg",
                    }}
                    style={tw`w-16 h-16 rounded-full`}
                  />
                  <View>
                    <Text style={tw`font-semibold ml-4 mb-1`}>
                      {item?.name}
                    </Text>
                    <Text style={tw`ml-4`}>Quantity: {item?.quantity}x</Text>
                    <Text style={tw`ml-4`}>Price: {item?.price}$</Text>
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={tw`bg-[#640100] px-4 py-2 mb-2`}>
                <Text style={tw`font-semibold text-white`}>{title}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
