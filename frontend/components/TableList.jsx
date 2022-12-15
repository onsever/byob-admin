import { View, Text, FlatList, RefreshControl } from "react-native";
import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  arr,
  onAction,
  tableList,
  refreshing,
  onRefresh,
}) {
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
