import React from 'react'
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import Card from './Card'
import { COLORS, globalStyles } from '../styles'
import { windowWidth } from '../utils'

const Meals = ({ data, emptyTitle, topButtonVisibility }) => {

    let marginTop = 25, count = 0, marginBottom = 0
    const cardWidth = windowWidth - 60

    return (
        <View style={styles.mainContainer}>
            <View style={globalStyles.absoluteCenterContainer}>
                <View style={globalStyles.circle}></View>
            </View>
            {   data.length == 0 ?
                <View style={globalStyles.absoluteCenterContainer}>
                    <Text style={styles.text}>
                        {emptyTitle}
                        {/* {`You don’t have any meal plan yet.\n Why not add a recipe?`} */}
                    </Text>
                </View>
                :
                <View style={styles.cardContainer}>
                    {
                        topButtonVisibility &&
                        <Pressable style={styles.clearBtn}>
                            <Text style={{ ...globalStyles.titleM, color: 'white' }}>
                                Clear All
                        </Text>
                        </Pressable>
                    }
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            data.map(() => {
                                count++
                                if (count == data.length) marginBottom = marginTop
                                return <Card marginTop={marginTop} height={218} width={cardWidth} marginBottom={marginBottom} />
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