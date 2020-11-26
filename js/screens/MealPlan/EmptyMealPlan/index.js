import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { COLORS, globalStyles } from '../../../styles';

/* when meal list is empty, show this screen  */
const EmptyMealPlan = () => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                {/* back circle */}
                <View style={styles.circle}></View>
                {/* heading text */}
                <View style={styles.text}>
                    <Text style={styles.text}>
                        {`You don’t have any meal plan yet.\n Why not add a recipe?`}
                    </Text>
                </View>
            </View>
        </View>
    )
}

// I found out 100 seems to be good for our ui imitation
const adjuster = 100;
const windowWidth = Dimensions.get('window').width + adjuster;

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        right: -(adjuster / 2),
        left: -(adjuster / 2),
        width: windowWidth,
        height: windowWidth,
        borderRadius: windowWidth / 2,
        backgroundColor: COLORS.PRIMARY_ICON,
        zIndex:-1
    },
    text: {
        ...globalStyles.titleXL,
        textAlign: 'center', 
    }
})



export default EmptyMealPlan;