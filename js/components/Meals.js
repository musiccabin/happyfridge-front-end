import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import Card from './Card'
import { COLORS, globalStyles, windowWidth } from '../styles'
import { useQuery } from '@apollo/client'
import { favRecipesQuery, completedRecipesQuery, recipesInMealplanQuery } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import { clearAllFromMealplanMutation } from '../graphql/mutations'

const Meals = ({ data, emptyTitle, showClearButton }) => {

    let count = 0, marginBottom = 0

    const [ recipes, setData ] = useState(data)

    const mealplanRecipesInfo = useQuery(recipesInMealplanQuery)
        if (mealplanRecipesInfo.error) console.error(error)

    const favRecipesInfo = useQuery(favRecipesQuery)
        if (favRecipesInfo.error) console.error(error)

    const completedRecipesInfo = useQuery(completedRecipesQuery)
        if (completedRecipesInfo.error) console.error(error)

    const [clearAll] = useMutation(clearAllFromMealplanMutation)
    const clear = () => {
        clearAll({variables: {value: {}}}).then(() => {            
            setData([])
          })
    }


    return (
        <View style={styles.mainContainer}>
            <View style={globalStyles.absoluteCenterContainer}>
                <View style={globalStyles.circle}></View>
            </View>
            {   recipes.length == 0 ?
                <View style={globalStyles.absoluteCenterContainer}>
                    <Text style={styles.text}>
                        {emptyTitle}
                    </Text>
                </View>
                :
                <View style={styles.cardContainer}>
                    {
                        recipes.length != 0 && showClearButton &&
                        <Pressable style={styles.clearBtn}>
                            <Text style={{ ...globalStyles.titleM, color: 'white' }} onPress={() => clear()}>
                                Clear All
                            </Text>
                        </Pressable>
                    }
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            recipes.map((recipe) => {
                                count++
                                if (count == recipes.length) marginBottom = 25
                                return <Card
                                    marginTop={25}
                                    height={218}
                                    width={windowWidth - 60}
                                    marginBottom={marginBottom}
                                    recipe={recipe}
                                    mealplanRecipes={mealplanRecipesInfo.data.recipesInMealplan}
                                    favourites={favRecipesInfo.data.favRecipes}
                                    completions={completedRecipesInfo.data.completedRecipes}
                                />
                            })
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    text: {
        ...globalStyles.titleXL,
        textAlign: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        height: '100%'
    },
    clearBtn: {
        width: '100%',
        backgroundColor: COLORS.SECONDARY,
        height: 32,
        ...globalStyles.pinCenter
    },
})

export default Meals