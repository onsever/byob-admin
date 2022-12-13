import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
// import { logout } from "../../redux/features/authSlice";
import tw from "twrnc";
import React from "react";
import TableList from "../../components/TableList";
import { useFetch } from "../../hooks/useFetch";

export default function HomeScreen({ navigation }) {
  const [noOfTables, setNoOfTables] = React.useState(null);
  const { loaded, loading, error, fetch, result } = useFetch();

  const handleTableClick = (index) => {
    navigation.navigate("DetailsScreen", { item: index });
  };

  React.useEffect(() => {
    fetch("constant");
  }, [1]);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        console.log(error);
      }
      if (result) {
        setNoOfTables(result[0].value);
      }
    }
  }, [loaded]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: StatusBar.currentHeight, padding: 10 }}
    >
      <View>
        <View style={tw`mt-5`}>
          <Text style={tw`text-center font-bold text-10`}>Select a Table</Text>
        </View>
        <View style={tw`w-full items-center justify-center px-4 py-2 mb-4`}>
          <TableList
            arr={Array.from(Array(+noOfTables).keys())}
            onAction={(index) => handleTableClick(index)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
