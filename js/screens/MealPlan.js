import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Pressable, Text, ScrollView } from 'react-native'
import { Card } from '../components'
import { COLORS, globalStyles } from '../styles'

const MealPlan = () => {

    let arr = [1, 2, 3, 4, 5, 6, 7,]
    let count = 0
    let mb = 0

    const [dataLength, setDataLength] = useState(false)

    useEffect(() => {
        if (arr.length == 0) setDataLength(true) 
        else setDataLength(false)
    }, [dataLength])

    return (
        <View style={styles.mainContainer}>

            {/* back circle container */}

            <View style={[globalStyles.absoluteCenterContainer]}>
                <View style={styles.circle}></View>
            </View>

            { dataLength ?

                <View style={[globalStyles.absoluteCenterContainer]}>
                    <Text style={styles.text}>
                        {`You don’t have any meal plan yet.\n Why not add a recipe?`}
                    </Text>
                </View>

                :

                <View style={styles.cardContainer}>
                    {/* top clear button */}
                    <Pressable style={styles.clearBtn}>
                        <Text style={{ ...globalStyles.titleM, color: 'white' }}>
                            {`Clear all`}
                        </Text>
                    </Pressable>

                    {/* Meal list */}
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {arr.map(() => {
                            count++
                            if (count == arr.length) mb = 40
                            return <View style={{ marginTop: 20, marginBottom: mb }}>
                                <Card />
                            </View>
                        })}
                    </ScrollView>
                </View>
            }

        </View>
    )
}

// I found out 100 seems to be good for our ui imitation
const adjuster = 100
const windowWidth = Dimensions.get('window').width + adjuster

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        margin: 'auto',
        height: '100%',
    },
    circle: {
        position: 'absolute',
        right: -(adjuster / 2),
        left: -(adjuster / 2),
        width: windowWidth,
        height: windowWidth,
        borderRadius: windowWidth / 2,
        backgroundColor: COLORS.PRIMARY_ICON,
        zIndex: -1
    },
    text: {
        ...globalStyles.titleXL,
        textAlign: 'center',
    },
    cardContainer: {
        alignItems: 'center',
    },
    clearBtn: {
        width: '100%',
        backgroundColor: COLORS.SECONDARY,
        height: 32,
        ...globalStyles.pinCenter
    },
    card: {
        // marginTop: 20,
    },
})

export default MealPlan