import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckList } from '../components'
import { globalStyles } from '../styles'

const Preferences = ( {route }) => {
    const { userDietary, userTags, allDietary, allTags, userId } = route.params

    const initDietary = []
    for (let restriction of allDietary) {
        let item = { id: restriction.id, title: restriction.name, checked: false }
        initDietary.push(item)
        if (userDietary.map(dr => dr.id).includes(restriction.id)) {
            item['checked'] = true
        }
    }

    const initTags = []
    for (let tag of allTags) {
        let item = { id: tag.id, title: tag.name, checked: false }
        initTags.push(item)
        if (userTags.map(t => t.id).includes(tag.id)) {
            item['checked'] = true
        }
    }

    const [dietary, setDietary] = useState(initDietary)
    const [tags, setTags] = useState(initTags)
    const updateDietary = (dietary) => setDietary(dietary)
    const updateTags = (tags) => setTags(tags)

    // useEffect(() => {
    //     if (((dietary.length + 1) % 3) == 0) {
    //         setDietary(dietary.concat({ title: 'hidden', checked: false, visibility: true }))
    //     }
    // }, [dietary])

    // useEffect(() => {
    //     if (((tags.length + 1) % 3) == 0) {
    //         setTags(tags.concat({ title: 'hidden', checked: false, visibility: true }))
    //     }
    // }, [tags])

    return (
        <View style={styles.mainContainer}>
            <Text style={[globalStyles.titleXL, styles.topSpacing]}>Dietary restrictions</Text>
            <CheckList
            inheritStyles={styles.topSpacing}
            data={dietary}
            tags={tags}
            userId={userId}
            updateDietary={updateDietary}
            category='dietary'
            />
            <Text style={[styles.topSpacing, globalStyles.titleXL]}>Meals</Text>
            <CheckList
            inheritStyles={styles.topSpacing}
            data={tags}
            dietary={dietary}
            userId={userId}
            updateTags={updateTags}
            category='tag'
            />
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