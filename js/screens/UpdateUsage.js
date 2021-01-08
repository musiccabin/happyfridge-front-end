import React, { useState } from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { Button, CategoryUnit, Quantity, UsageBar } from '../components'

const UpdateUsage = () => {

    const category = ["Dairy", "Nuts and Seeds", "Meat", "Produce", "Frozen"]
    const parts = ["1/4", "1/3", "1/3", "2/3", "0"]
    const units = ["kg", "lb"]
    const [categoryTitle, setCategoryTitle] = useState(category[0])
    const [wholeTitle, setWholeTitle] = useState("1")
    const [partTitle, setPartTitle] = useState(parts[0])
    const [unitTitle, setUnitTitle] = useState(units[0])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <UsageBar
                    categoryTitle={categoryTitle}
                    wholeTitle={wholeTitle}
                    partTitle={partTitle}
                    unitTitle={unitTitle}
                />
                <View style={styles.parentContainer}>
                    <View style={styles.leftChildContainer}>
                        <CategoryUnit
                            categories={category}
                            units={units}
                            categoryCallback={(value) => setCategoryTitle(value)}
                            unitCallback={(value) => setUnitTitle(value)}
                        />

                    </View>
                    <View style={styles.rightChildContainer}>
                        <Quantity
                            wholeCallback={(value) => setWholeTitle(value)}
                            partCallback={(value) => setPartTitle(value)}
                            parts={parts}
                        />
                        <View style={styles.buttonContainer}>
                            <Button children={"Save"} style={{ width: 110 }} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        ...globalStyles.content,
        paddingTop: 50,
        backgroundColor: COLORS.WHITE,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    parentContainer: {
        flexDirection: 'row',
        marginTop: 70,
        justifyContent: 'space-between',
    },
    leftChildContainer: {
        flexBasis: '40%',
        paddingEnd: 7
    },
    rightChildContainer: {
        flexBasis: '60%',
        paddingStart: 7,
        marginTop: -7
    },
    buttonContainer: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: -2
    }
});

export default UpdateUsage