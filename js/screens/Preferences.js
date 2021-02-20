import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckList } from '../components'
import { globalStyles } from '../styles'
import { Context } from '../context'

import { useQuery, useMutation } from '@apollo/client'
import { userDietaryRestrictionsQuery, userTagsQuery, allDietaryRestrictionsQuery, allTagsQuery } from '../graphql/queries'
import { updateUserMutation } from '../graphql/mutations'

const Preferences = ({ route }) => {

    console.log('dietary data passed: ', route.userDietary)
    const { currentUserContext } = useContext(Context)
    const [currentUser, setCurrentUser] = currentUserContext

    // const dataDietary = [{ title: 'Vegetarian', checked: false }, { title: 'Vegan', checked: false }, { title: 'Dairy-Free', checked: false }, { title: 'Gluten-Free', checked: false }]
    // const dataTags = [{ title: 'Breakfast', checked: false }, { title: 'Brunch', checked: false }, { title: 'Lunch', checked: false }, { title: 'Dinner', checked: false }, { title: 'Dessert', checked: false }, { title: 'Party', checked: false }, { title: 'Smoothie', checked: false }, { title: 'Salad', checked: false }]

    const [dietary, setDietary] = useState([])
    const [tags, setTags] = useState([])

    const dataDietary = []
    const dataTags = []
    const tagIds = []
    const dietaryIds = []

    const setRestrictions = (restrictions, allRestrictions) => {
        console.log('dietary data is: ', restrictions, allRestrictions)
        console.log('got here in setRestrictions')
        for (let restriction of allRestrictions.allDietaryRestrictions) {
            let item = { id: restriction.id, title: restriction.name, checked: false }
            dataDietary.push(item)
            if (restrictions.userDietaryRestrictions.includes(restriction)) {
                item['checked'] = true
                dietaryIds.push(item.id)
            }
        }
        if (dietary.length != dataDietary.length) setDietary(dataDietary)
        return dataDietary
    }

    const setMeals = (userTags, allTags) => {
        console.log('tags data is: ', userTags, allTags)
        console.log('got here in setMeals')
        for (let tag of allTags.allTags) {
            let item = { id: tag.id, title: tag.name, checked: false }
            dataTags.push(item)
            if (userTags.userTags.includes(tag)) {
                item['checked'] = true
                tagIds.push(item.id)
            }
        }
        if (tags.length != dataTags.length) setTags(dataTags)
        return dataTags
    }

    useEffect(() => {
        if (((dietary.length + 1) % 3) == 0) {
            setDietary(dietary.concat({ title: 'hidden', checked: false, visibility: true }))
        }
    }, [dietary])

    useEffect(() => {
        if (((tags.length + 1) % 3) == 0) {
            setTags(tags.concat({ title: 'hidden', checked: false, visibility: true }))
        }
    }, [tags])

    const updatePreference = (id, category) => { 
        let input
        if (category === 'dietary') {
            dietaryIds.push(id)
            for (let item of dataDietary) {
                if (item.id === id) {
                    const checked = item['checked']
                    item['checked'] = !checked
                }
                if (dietary.length != dataDietary.length) setDietary(dataDietary)
                break
            }
            input = { id: currentUser.id, dietaryRestrictions: dietaryIds }
        } else {
            tagIds.push(id)
            for (let item of dataTags) {
                if (item.id === id) {
                    const checked = item['checked']
                    item['checked'] = !checked
                }
                if (tags.length != dataTags.length) setTags(dataTags)
                break
            }
            input = { id: currentUser.id, tags : tagIds }
        }
        const [updatePreferences] = useMutation(updateUserMutation, { variables: { value: input }})
     }

     const userDietary = useQuery(userDietaryRestrictionsQuery)
     const userTags = useQuery(userTagsQuery)
     const allDietary = useQuery(allDietaryRestrictionsQuery)
     const allTags = useQuery(allTagsQuery)

    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleXL, styles.topSpacing]}>Dietary restrictions</Text>
            <CheckList inheritStyles={styles.topSpacing} data={setRestrictions(userDietary.data, allDietary.data)} callback={updatePreference('dietary')} />
            <Text style={[styles.topSpacing, globalStyles.titleXL]}>Meals</Text>
            <CheckList inheritStyles={styles.topSpacing} data={setMeals(userTags.data, allTags.data)} callback={updatePreference('tag')} />
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