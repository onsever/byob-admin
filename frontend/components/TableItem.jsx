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
          style={tw`flex justify-center items-center mb-5 px-2`}
          onPress={() => onAction(index + 1)}
        >
          {
            <View
              style={tw`flex flex-row bg-white items-center justify-center rounded-lg shadow-md w-40 h-20 relative`}
            >
              <View>
              <Image source={require("../assets/cutlery.png")} />
              </View>
              <View
                style={tw`absolute top-[-2] right-[-2] rounded-full shadow-md bg-white px-2 py-2`}
              >
                <Text style={tw`px-3 py-2 rounded-full shadow-lg`}>{index + 1}</Text>
              </View>
            </View>
          }
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`flex justify-center items-center mb-5 px-2`}
          onPress={() => onAction(index + 1)}
        >
          {
            <View
              style={tw`flex flex-row bg-white justify-center items-center w-25 h-25 rounded-full shadow-md`}
            >
              <View
                style={tw`absolute top-[-1] right-[-1] rounded-lg shadow-md bg-white px-2 py-1`}
              >
                <Text style={tw`px-2 py-1 rounded-lg shadow-lg`}>{index + 1}</Text>
              </View>
              <View>
              <Image source={require("../assets/cutlery.png")} />
                
              </View>
            </View>
          }
        </TouchableOpacity>
      )}
    </>
  );
}
