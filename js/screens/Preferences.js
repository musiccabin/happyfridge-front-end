import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckList } from '../components'
import { globalStyles } from '../styles'

const Preferences = () => {

    const data1 = [{ title: 'Vegetarian', checked: true }, { title: 'Vegan', checked: false }, { title: 'Dairy-Free', checked: false }, { title: 'Gluten-Free', checked: true }, { title: 'non-veg', checked: false }]
    const data2 = [{ title: 'Breakfast', checked: false }, { title: 'Brunch', checked: false }, { title: 'Lunch', checked: false }, { title: 'Dinner', checked: true }, { title: 'desert', checked: false }, { title: 'Party', checked: true }, { title: 'Smoothie', checked: false }]

    const [dietary, setDietary] = useState(data1)
    const [meals, setMeals] = useState(data2)

    useEffect(() => {
        if (((dietary.length + 1) % 3) == 0) {
            setDietary(dietary.concat({ title: 'hidden', checked: false, visibility: true }))
        }
    }, [meals])

    useEffect(() => {
        if (((meals.length + 1) % 3) == 0) {
            setMeals(meals.concat({ title: 'hidden', checked: false, visibility: true }))
        }
    }, [meals])

    const handlePress = (value) => { 
        //TODO: ACTION
     }

    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleXL, styles.topSpacing]}>Dietary restrictions</Text>
            <CheckList inheritStyles={styles.topSpacing} data={dietary} callback={handlePress} />
            <Text style={[styles.topSpacing, globalStyles.titleXL]}>Meals</Text>
            <CheckList inheritStyles={styles.topSpacing} data={meals} callback={handlePress} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingStart: 30,
        paddingEnd: 30,
    },
    topSpacing: {
        marginTop: 28,
    },
})

export default Preferences