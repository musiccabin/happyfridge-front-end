import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import Card from './Card'
import { COLORS, globalStyles, windowWidth } from '../styles'

const Meals = ({ data, emptyTitle, showClearButton }) => {

    let count = 0, marginBottom = 0

    return (
        <View style={styles.mainContainer}>
            <View style={globalStyles.absoluteCenterContainer}>
                <View style={globalStyles.circle}></View>
            </View>
            {   data.length == 0 ?
                <View style={globalStyles.absoluteCenterContainer}>
                    <Text style={styles.text}>
                        {emptyTitle}
                    </Text>
                </View>
                :
                <View style={styles.cardContainer}>
                    {
                        data.length != 0 && showClearButton &&
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
                                if (count == data.length) marginBottom = 25
                                return <Card marginTop={25} height={218} width={windowWidth - 60} marginBottom={marginBottom} />
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