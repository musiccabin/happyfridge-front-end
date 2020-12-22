import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Card from './Card'


const CardList = ({ navigation }) => {
  return (
    <ScrollView horizontal>
      <View style={styles.list}>
        <Card recipeCompleted={true} onPress={() => navigation.navigate('RecipeDetails')} marginRight={15} height={218} width={250} />
        <Card marginRight={15} height={218} width={250} />
        <Card marginRight={15} height={218} width={250} />
        <Card marginRight={15} height={218} width={250} />
        <Card marginRight={15} height={218} width={250} />
        <Card marginRight={15} height={218} width={250} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    height: 235,
  }
})

export default CardList
