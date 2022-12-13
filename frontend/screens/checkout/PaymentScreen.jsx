import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import tw from "twrnc";
import { usePost } from "../../hooks/usePost";

export default function PaymentScreen({ route, navigation }) {
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const { totalPrice, orderId } = route.params;
  const { post, loaded, loading, error, result } = usePost();

  const billRef = React.useRef(null);

  const handleMethod = () => {
    if (!paymentMethod) {
      Alert.alert("Please select a payment method.");
      return;
    }

    post("order/complete/" + orderId, {
      paymentMethod: paymentMethod,
      totalPaid: totalPrice,
    });

    if (result) {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={tw`w-full h-full`}>
      <View style={tw`w-full flex-row items-center justify-between px-4 py-2`}>
        <TouchableOpacity
          style={tw`bg-red-400 px-4 py-2 rounded-lg`}
          onPress={() => setPaymentMethod("debitCard")}
        >
          <Text style={tw`font-semibold text-white`}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-green-400 px-4 py-2 rounded-lg`}
          onPress={() => setPaymentMethod("cash")}
        >
          <Text style={tw`font-semibold text-white`}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          ref={billRef}
          style={tw`bg-blue-400 px-4 py-2 rounded-lg`}
          onPress={() => handleMethod()}
        >
          <Text style={tw`font-semibold text-white`}>Bill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
