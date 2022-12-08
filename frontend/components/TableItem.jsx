import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import React from "react";

export default function TableItem({ index, onAction, arr }) {
  const [shapes, setShapes] = React.useState(null);

  const determineShape = () => {
    if (!arr) {
      console.log("No array");
      return;
    }

    const shapesArray = arr.map((item, index) => {
      return index % 2 === 0 ? "rectangle" : "circle";
    });

    let currentShape = shapesArray[0];
    let nextShape = shapesArray[1];
    const shapesResult = [];

    shapesArray.forEach((item, i, array) => {
      if (i >= 1 && i < array.length - 1) {
        currentShape = item;
        nextShape = array[i + 1];
        shapesResult.push(currentShape);
        shapesResult.push(nextShape);
      }
    });

    setShapes(shapesResult);
  };

  React.useEffect(() => {
    determineShape();
  }, []);

  return (
    <>
      {shapes && shapes[index] === "rectangle" ? (
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
