import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Card from './Card'


const CardList = ({navigation}) => {
  return (
    <ScrollView horizontal>
      <View style={styles.list}>
        <Card onPress={() => navigation.navigate('RecipeDetails')} />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
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
