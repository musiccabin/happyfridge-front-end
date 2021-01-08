import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DropDown from './DropDown'
import Incremental from './Incremental'
import { COLORS } from '../styles'

const Quantity = ({ wholeCallback, partCallback, parts }) => {
    return (
        <View>
            <View style={styles.quantityTitleContainer}>
                <Text style={styles.quantityTitle}>Quantity</Text>
            </View>
            <View style={styles.quantityContainer}>
                <Incremental
                    inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                    callback={(value) => wholeCallback(value)}
                />
                <DropDown
                    categories={parts}
                    listTop={{ marginTop: 32 }}
                    inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                    callback={(value) => partCallback(value)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default Quantity
