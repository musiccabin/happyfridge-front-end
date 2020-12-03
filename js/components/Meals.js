import React from 'react'
import { View, StyleSheet, Dimensions, Pressable, Text, ScrollView } from 'react-native'
import Card from './Card'
import { COLORS, globalStyles } from '../styles'

const Meals = ({ data, emptyTitle, topButtonVisibility }) => {

    let margin = 25, count = 0, mb = 0
    const windowWidth = Dimensions.get('window').width - 60

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
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {
                            data.map(() => {
                                count++
                                if (count == data.length) mb = margin
                                return <Card marginTop={margin} height={218} width={windowWidth} marginBottom={mb} />
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