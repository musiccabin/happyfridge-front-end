import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { COLORS } from "../styles";

const LeftOverList = ({ data }) => {
  return (
    <FlatList
      data={data}
      style={styles.listWrapper}
      renderItem={({ item }) => (
        <View style={styles.list} key={item.id}>
          <Text>{item.name}</Text>
          <Text>
            {item.quantity}
            {item.unit}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: COLORS.WHITE,
  },
  list: {
    backgroundColor: COLORS.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
  },
});

export default LeftOverList;
