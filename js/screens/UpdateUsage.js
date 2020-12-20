import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { DropDown, Incremental, Button } from '../components'

const UpdateUsage = () => {

    const category = [{ itemName: "Dairy" }, { itemName: "Nuts and Seeds" }, { itemName: "Meat" }, { itemName: "Produce" }, { itemName: "Frozen" },]
    const parts = [{ itemName: "1/4" }, { itemName: "1/3" }, { itemName: "1/2" }, { itemName: "2/3" }, { itemName: "3/4", itemName: "0" },]
    const units = [{ itemName: "lb" }, { itemName: "kg" }]
    const [categoryTitle, setCategoryTitle] = useState(category[0].itemName)
    const [wholeTitle, setWholeTitle] = useState("1")
    const [partTitle, setPartTitle] = useState(parts[0].itemName)
    const [unitTitle, setUnitTitle] = useState(units[0].itemName)

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.titleM]}>{categoryTitle}</Text>
                <Text style={[globalStyles.titleM]}>{wholeTitle != 0 && wholeTitle} {partTitle != 0 && partTitle} {unitTitle}</Text>
            </View>
            <View style={styles.parentContainer}>
                <View style={styles.leftChildContainer}>
                    <DropDown title={"Category"} categories={category} callback={(value) => setCategoryTitle(value)} />
                    <DropDown title={"Unit"} categories={units} callback={(value) => setUnitTitle(value)} inheritStyle={{marginTop: 40}} />
                </View>
                <View style={styles.rightChildContainer}>
                    <View style={styles.quantityTitleContainer}>
                        <Text style={styles.quantityTitle}>Quantity</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <Incremental inheritStyle={{ flexBasis: '35%' }} callback={(value) => setWholeTitle(value)} />
                        <DropDown categories={parts} inheritStyle={{ flexBasis: '55%' }} callback={(value) => setPartTitle(value)} />
                    </View>
                    <View style={styles.buttonContainer}><Button children={"Save"} style={{ width: 110 }} /></View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
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
        justifyContent: 'flex-end'
    }
});

export default UpdateUsage