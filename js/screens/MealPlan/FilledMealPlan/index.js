import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, ScrollView } from 'react-native';
import { Card } from '../../../components';
import { COLORS, globalStyles } from '../../../styles';

const FilledMealPlan = () => {

    let arr = [1, 2, 3, 4, 5, 6, 7,]
    let count = 0;
    let mb = 0;

    return (
        <View style={styles.mainContainer}>
            {/* back circle container */}
            <View style={styles.circleContainer}>
                <View style={styles.circle}></View>
            </View>

            {/* card container */}
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
                        count++;
                        if (count == arr.length) mb = 120
                        console.log(mb)
                        return <View style={{ marginTop: 20, marginBottom: mb }}>
                            <Card />
                        </View>
                    })}
                </ScrollView>

            </View>
        </View>
    )
}

// I found out 100 seems to be good for our ui imitation
const adjuster = 100;
const windowWidth = Dimensions.get('window').width + adjuster;

const styles = StyleSheet.create({
    circleContainer: {
        justifyContent:'center', 
        position:'absolute', 
        height:'95%',
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
    cardContainer: {
        top: 0,
        left: 0,
        right: 0,
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
    }
})


export default FilledMealPlan;