import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

export default function PaymentScreen({ navigation }) {
  const [paymentMethod, setPaymentMethod] = React.useState(null);

  const billRef = React.useRef(null);

  const handleMethod = () => {
    if (!paymentMethod) {
      return;
    }

    navigation.navigate("DetailsScreen", {
      paymentMethod: paymentMethod,
    });
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
