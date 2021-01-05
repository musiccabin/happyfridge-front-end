import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Card from './Card'
import { recommendedRecipesQuery } from '../graphql/queries'
import { useQuery } from '@apollo/client'


const CardList = ({ navigation }) => {
  const { data, error, loading } = useQuery(recommendedRecipesQuery)
  if(loading) return null
  return (
    <ScrollView horizontal>
      <View style={styles.list}>
        {data.recommendedRecipes.map((recipe) => {
          <Card 
            recipe={recipe} 
            onPress={() => navigation.navigate('RecipeDetails')}
            marginRight={15} height={218} width={250} 
          />
        })}
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
