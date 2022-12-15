import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { usePost } from "../../hooks/usePost";

export default function PaymentScreen({ route, navigation }) {
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [debitColor, setDebitColor] = React.useState("");
  const [cashColor, setCashColor] = React.useState("");
  const { totalPrice, orderId } = route.params;
  const { post, loaded, loading, error, result } = usePost();

  const billRef = React.useRef(null);

  const handleMethod = () => {
    if (!paymentMethod) {
      Alert.alert("Please select a payment method.");
      return;
    }

    Alert.alert("Are you sure?", "You cannot change your payment method.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          post("order/complete/" + orderId, {
            paymentMethod: paymentMethod,
            totalPaid: totalPrice.toFixed(2),
          });
        },
      },
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment",
    });
  }, []);

  React.useEffect(() => {
    if (paymentMethod === "debitCard") {
      setDebitColor("bg-white/70");
      setCashColor("");
    } else if (paymentMethod === "cash") {
      setCashColor("bg-white/70");
      setDebitColor("");
    }
  }, [paymentMethod]);

  React.useEffect(() => {
    if (loaded) {
      if (result) {
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Payment failed!");
      }
    }
  }, [loaded]);

  return (
    <View style={tw`w-full h-full`}>
      <Text style={tw`text-center text-2xl font-semibold mt-4`}>
        Please select a payment method
      </Text>
      <View
        style={tw`w-full flex-row items-center justify-between px-4 py-2 my-4`}
      >
        <TouchableOpacity
          style={tw`px-4 py-2 rounded-lg w-[48%] shadow-lg ${debitColor}`}
          onPress={() => setPaymentMethod("debitCard")}
        >
          <Image
            source={require("../../assets/card.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`px-4 py-2 rounded-lg w-[48%] shadow-lg ${cashColor}`}
          onPress={() => setPaymentMethod("cash")}
        >
          <Image
            source={require("../../assets/cash.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        ref={billRef}
        style={tw`bg-[#640100] px-4 py-2 rounded-lg items-center justify-center self-center shadow-lg`}
        onPress={() => handleMethod()}
      >
        <Text style={tw`font-semibold text-white text-lg tracking-wider`}>
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
}
