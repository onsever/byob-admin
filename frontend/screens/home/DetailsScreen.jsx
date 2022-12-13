import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckBox from "../../components/CheckBox";

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { loaded, loading, error, fetch, result } = useFetch();
  const [data, setData] = React.useState(null);
  const [infoClicked, setInfoClicked] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [grandTotal, setGrandTotal] = React.useState(0);
  const [gratuityClicked, setGratuityClicked] = React.useState(false);

  const dateParser = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}/${month}/${year}`;
  };

  const toTwoDecimal = (num) => {
    return num.toFixed(2);
  };

  const gstCalculator = (price) => {
    return price * 0.13;
  };

  const grandTotalCalculator = (price) => {
    setGrandTotal(+toTwoDecimal(price) + +toTwoDecimal(gstCalculator(price)));
    return +toTwoDecimal(price) + +toTwoDecimal(gstCalculator(price));
  };

   const handleGratuity = () => {
    const extraPrice = +toTwoDecimal(gstCalculator(totalPrice));

    if (gratuityClicked) {
      setGrandTotal(grandTotal + extraPrice);
    } else {
      setGrandTotal(totalPrice + extraPrice);
    }
  };

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
        Alert.alert("Error", error.data);
        navigation.goBack();
      }
      if (result) {
        setData(result);
        if (result.order) {
          setTotalPrice(
            result.order.drinkOrder.reduce((acc, cur) => {
              return acc + cur.price * cur.quantity;
            }, 0) +
              result.order.order.reduce((acc, cur) => {
                return acc + cur.price * cur.quantity;
              }, 0)
          );
        }
      }
    }
  }, [loaded]);

  React.useEffect(() => {
    grandTotalCalculator(totalPrice);
  }, [totalPrice]);

  return (
    <ScrollView style={tw`w-full h-full`}>
      {loading && !loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={tw`w-full h-full`}
        />
      ) : (
        <View style={tw`w-full h-full items-center`}>
          <View style={tw`flex-row items-center my-2`}>
            <Text style={tw`text-center font-bold text-xl mr-4`}>
              Customer: {data?.user.firstName + " " + data?.user.lastName}
            </Text>
            <Ionicons
              name="information-circle"
              size={30}
              color="blue"
              onPress={() => setInfoClicked(!infoClicked)}
            />
          </View>
          {infoClicked && (
            <View style={tw`w-[90%] bg-slate-200/40 rounded-lg px-2 py-4`}>
              <Text style={tw`text-center text-lg font-semibold mb-1`}>
                Customer Information
              </Text>
              <View style={tw`w-full h-[1px] bg-black`}></View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`font-semibold`}>Email Address:</Text>
                <Text>{data?.user.email}</Text>
              </View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`font-semibold`}>Phone Number:</Text>
                <Text>{data?.user.phone}</Text>
              </View>
              <View style={tw`flex-row justify-between mt-2`}>
                <Text style={tw`font-semibold`}>Date of Birth:</Text>
                <Text>{dateParser(data?.user.dob)}</Text>
              </View>
            </View>
          )}
          {data?.order ? (
            <View style={tw`w-[90%] items-center justify-center`}>
              <View style={tw`w-full flex-row items-center justify-between`}>
                <Text style={tw`font-semibold text-lg`}>Orders</Text>
                <Text style={tw`underline`}>
                  {data?.order.isComplete ? "Completed" : "Not Completed"}
                </Text>
              </View>
              <View style={tw`w-full h-[1px] bg-black`}></View>
              <View style={tw`w-full flex-row justify-between mt-2`}>
                <Text style={tw`font-semibold`}>Order ID:</Text>
                <Text>{data?.order._id}</Text>
              </View>
              <View style={tw`w-full flex-row justify-between mt-2`}>
                <Text style={tw`font-semibold`}>Total Number of Orders:</Text>
                <Text>{data?.order.__v} orders</Text>
              </View>
              <View style={tw`w-full flex-row justify-between mt-6`}>
                <Text style={tw`font-semibold`}>Name</Text>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`mr-4`}>Price ($)</Text>
                  <Text style={tw``}>Quantity (n)</Text>
                </View>
              </View>
              <View style={tw`w-full h-[1px] bg-black`}></View>
              {/* Drink Orders Table */}
              {data?.order.drinkOrder.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={tw`w-full flex-row justify-between mt-2`}
                  >
                    <Text style={tw`font-semibold`}>
                      {item.name || "Drink"}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`mr-2`}>{item.price}$</Text>
                      <Text>{item.quantity}</Text>
                    </View>
                  </View>
                );
              })}
              {/* Food Orders Table */}
              {data?.order.order &&
                data?.order.order.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={tw`w-full flex-row justify-between mt-2`}
                    >
                      <Text style={tw`font-semibold`}>{item.name}</Text>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`mr-2`}>{item.price}$</Text>
                        <Text>{item.quantity}</Text>
                      </View>
                    </View>
                  );
                })}
              {/* Calculation */}
              <View style={tw`w-full items-start mt-2 border-b`}>
                <Ionicons name="add" size={20} color="black" />
              </View>
              <View
                style={tw`w-full flex-row items-center justify-between mt-2`}
              >
                <Text style={tw`font-semibold`}>Subtotal</Text>
                <Text style={tw``}>{toTwoDecimal(totalPrice)}$</Text>
              </View>
              <View
                style={tw`w-full flex-row items-center justify-between mt-2`}
              >
                <Text style={tw`font-semibold`}>GST (13%)</Text>
                <Text style={tw``}>
                  {toTwoDecimal(gstCalculator(totalPrice))}$
                </Text>
              </View>
              {/* Gratuity */}
              <View
                style={tw`w-full flex-row items-center justify-between mt-2`}
              >
                <Text style={tw`font-semibold`}>Gratuity (13%)</Text>
                <CheckBox
                  onAction={(checked, setChecked) => {
                    setChecked(!checked);
                    setGratuityClicked(checked);
                    handleGratuity();
                    data?.order.drinkOrder.map((item) => {
                      console.log(item);
                    });

                    data?.order.order.map((item) => {
                      console.log(item);
                    });
                  }}
                />
              </View>
              <View
                style={tw`w-full flex-row items-center justify-between mt-2`}
              >
                <Text style={tw`font-semibold`}>Grand Total</Text>
                <Text style={tw``}>{grandTotal}$</Text>
              </View>
              <TouchableOpacity
                style={tw`bg-red-400 px-4 py-2 rounded-lg my-4`}
                onPress={() => {
                  navigation.navigate("PaymentScreen", {
                    totalPrice: grandTotal,
                    orderId: data?.order._id,
                  });
                }}
              >
                <Text style={tw`font-semibold text-white`}>Checkout</Text>
              </TouchableOpacity>
              {route.params.paymentMethod && (
                <Text>Payment Method: {route.params.paymentMethod}</Text>
              )}
            </View>
          ) : (
            <View style={tw`w-[90%] h-2/3 items-center justify-center`}>
              <Text style={tw`font-semibold text-lg`}>
                There is no order for this table yet.
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
