import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Picker } from "react-native";
import { Button } from "../components";
import { COLORS, globalStyles } from "../styles";
import { LeftOverTabs } from "../navigation";

const LeftOvers = () => {
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const data = [
    {
      id: 1,
      name: "Bananas",
      category: "produce",
      quantity: "1",
      unit: "lb",
    },
    {
      id: 2,
      name: "Chicken",
      category: "meat",
      quantity: "2",
      unit: "lb",
    },
    {
      id: 3,
      name: "Frozen Beans",
      category: "frozen",
      quantity: "3",
      unit: "lb",
    },
    {
      id: 4,
      name: "Milk",
      category: "dairy",
      quantity: "3",
      unit: "lb",
    },
    {
      id: 5,
      name: "Seaweed",
      category: "other",
      quantity: 4,
      unit: "lb",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[globalStyles.content, styles.separator]}>
        <Text style={[globalStyles.titleXL, styles.title]}>
          How much of each ingredient {"\n"} did you use?
        </Text>
        <View style={globalStyles.inputWrapper}>
          <View style={globalStyles.half}>
            <Text style={styles.label}>Ingridient</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
          </View>
          <View style={globalStyles.half}>
            <Text>Category</Text>
            <Picker
              selectedValue={selectedCategory}
              itemStyle={styles.pickerItem}
              style={styles.picker}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <Picker.Item label="Produce" value="produce" />
              <Picker.Item label="Meat" value="meat" />
            </Picker>
          </View>
        </View>
        <View style={globalStyles.inputWrapper}>
          <View style={globalStyles.medium}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              style={styles.input}
            />
          </View>
          <View style={globalStyles.medium}>
            <Text>Unit</Text>
            <Picker
              selectedValue={selectedUnit}
              itemStyle={styles.pickerItem}
              style={styles.picker}
              onValueChange={(value) => setSelectedUnit(value)}
            >
              <Picker.Item label="lb" value="lb" />
              <Picker.Item label="kg" value="kg" />
            </Picker>
          </View>
          <View style={globalStyles.medium}>
            <Button
              onPress={() => alert("leftover added")}
              style={styles.saveButton}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.leftOverTabs}>
        <LeftOverTabs data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    textAlign: "center",
    paddingBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PRIMARY,
    fontSize: 14,
    paddingVertical: 5,
  },
  picker: {
    paddingHorizontal: 10,
  },
  pickerItem: {
    height: 50,
  },
  saveButton: {
    width: 140,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SEPARATOR,
    paddingBottom: 10,
  },
  leftOverTabs: {
    flex: 1,
  },
});

export default LeftOvers;
