import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import React from "react";

export default function TableItem({ index, onAction }) {
  return (
    <>
      {index % 2 === 0 ? (
        <TouchableOpacity
          style={tw`flex justify-center items-center`}
          onPress={() => onAction(index + 1)}
        >
          <View style={tw`flex flex-row justify-between w-30`}>
            <Image source={require("../assets/chair.png")} />
            <Image source={require("../assets/chair.png")} />
          </View>
          <View
            style={tw`border border-black bg-gray-300 w-30 h-20 flex justify-center items-center`}
          >
            <View
              style={tw`border-solid border-2 border-white rounded-full bg-white h-10 w-10 flex items-center justify-center`}
            >
              <Text>{index + 1}</Text>
            </View>
          </View>
          <View style={tw`flex flex-row justify-between w-30`}>
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`flex justify-center items-center`}
          onPress={() => onAction(index + 1)}
        >
          <View style={tw`flex flex-row justify-between w-40`}>
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "-44.92deg" }] }}
            />
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "44.92deg" }] }}
            />
          </View>
          <View
            style={tw`border border-black bg-gray-300 flex justify-center items-center rounded-full h-20 w-20`}
          >
            <View
              style={tw`border-solid border-2 border-white rounded-full bg-white h-7 w-7 flex items-center justify-center`}
            >
              <Text>{index + 1}</Text>
            </View>
          </View>
          <View style={tw`flex flex-row justify-between w-40`}>
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "-130.47deg" }] }}
            />
            <Image
              source={require("../assets/chair.png")}
              style={{ transform: [{ rotate: "130.47deg" }] }}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
