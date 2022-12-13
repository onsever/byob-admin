import { View, Text, FlatList } from "react-native";
import React from "react";
import TableItem from "./TableItem";

export default function TableList({ arr, onAction }) {
  const handleTableSelection = (index) => {
    onAction(index);
  };

  return (
    <FlatList
      data={arr}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
      style={{ width: "100%", marginBottom: "30%", paddingTop: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item, index }) => (
        <TableItem
          index={index}
          onAction={(index) => handleTableSelection(index)}
          arr={arr}
        />
      )}
    />
  );
}
