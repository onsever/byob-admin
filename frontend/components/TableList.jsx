import { View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import TableItem from "./TableItem";
import { useFetch } from "../hooks/useFetch";

export default function TableList({ arr, onAction }) {
  const { fetch, loading, loaded, result, error } = useFetch();
  const [tables, setTable] = useState(
    arr.map((x) => {
      return { tableNo: x + 1 };
    })
  );

  const handleTableSelection = (index) => {
    onAction(index);
  };

  useEffect(() => {
    fetch("table/all-reservation");
  }, [1]);

  useEffect(() => {
    if (result) {
      setTable(
        tables.map((table) => {
          table.isReserved = result.find((x) => +x.tableNo === +table.tableNo)
            ? true
            : false;
          return table;
        })
      );
    }
  }, [loaded]);

  return (
    <FlatList
      data={tables}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
      style={{ width: "100%", marginBottom: "30%", paddingTop: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => fetch("table/all-reservation")}
        />
      }
      renderItem={({ item, index }) => (
        <TableItem
          item={item}
          index={index}
          onAction={(index) => handleTableSelection(index)}
          arr={tables}
        />
      )}
    />
  );
}
