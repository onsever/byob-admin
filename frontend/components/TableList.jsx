import { View, Text, FlatList } from "react-native";
import React from "react";
import TableItem from "./TableItem";

export default function TableList({ arr, onAction, tableList }) {
  const handleTableSelection = (index) => {
    onAction(index);
  };

  console.log(tableList);

  return (
    <FlatList
      data={arr}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
      style={{ width: "100%", marginBottom: "30%", paddingTop: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item, index }) => (
        <TableItem
          tableList={tableList}
          index={index}
          onAction={(index) => handleTableSelection(index)}
          arr={arr}
        />
      )}
    />
  );
}
