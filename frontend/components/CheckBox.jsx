import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export default function CheckBox({ onAction }) {
  const [checked, setChecked] = React.useState(false);

  return (
    <TouchableOpacity
      style={{
        height: 20,
        width: 20,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => onAction(checked, setChecked)}
    >
      {checked && <Ionicons name="checkmark" size={16} color="black" />}
    </TouchableOpacity>
  );
}
