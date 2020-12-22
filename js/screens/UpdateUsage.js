import React, { useState } from 'react'
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { DropDown, Incremental, Button } from '../components'

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
                <View style={styles.titleContainer}>
                    <Text style={globalStyles.titleM}>
                        {categoryTitle}
                    </Text>
                    <Text style={globalStyles.titleM}>
                        {wholeTitle != 0 && wholeTitle} {partTitle != 0 && partTitle} {unitTitle}
                    </Text>
                </View>
                <View style={styles.parentContainer}>
                    <View style={styles.leftChildContainer}>
                        <View style={{ zIndex: 9 }}>
                            <DropDown
                                title={"Category"}
                                listTop={{ marginTop: 59 }}
                                buttonStyle={{ marginTop: 7 }}
                                categories={category}
                                callback={(value) => setCategoryTitle(value)}
                            />
                        </View>
                        <DropDown
                            title={"Unit"}
                            listTop={{ marginTop: 52 }}
                            categories={units}
                            callback={(value) => setUnitTitle(value)}
                            inheritStyle={{ marginTop: 40 }}
                        />
                    </View>
                    <View style={styles.rightChildContainer}>
                        <View style={styles.quantityTitleContainer}>
                            <Text style={styles.quantityTitle}>Quantity</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Incremental
                                inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                                callback={(value) => setWholeTitle(value)}
                            />
                            <DropDown
                                categories={parts}
                                listTop={{ marginTop: 32 }}
                                inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                                callback={(value) => setPartTitle(value)}
                            />
                        </View>
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
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.BACKGROUND,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
        borderTopLeftRadius: 0
    },
    quantityTitleContainer: {
        backgroundColor: COLORS.BACKGROUND,
        width: 80,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7
    },
    quantityTitle: {
        paddingTop: 7,
        paddingStart: 10,
    },
    buttonContainer: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: -1
    }
});

export default UpdateUsage