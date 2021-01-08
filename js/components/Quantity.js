import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DropDown from './DropDown'
import Incremental from './Incremental'
import { COLORS } from '../styles'

const Quantity = ({ wholeCallback, partCallback, parts, callbackIngredientHighlight }) => {

    const [highlightStyling, setHighlightStyling] = useState(false)

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
            color: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            paddingTop: 7,
            paddingStart: 10,
        },
    })

    return (
        <View>
            <View style={styles.quantityTitleContainer}>
                <Text style={styles.quantityTitle}>Quantity</Text>
            </View>
            <View style={styles.quantityContainer}>
                <Incremental
                    inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                    callback={(value) => wholeCallback(value)}
                    callbackLineColor={value => {
                        setHighlightStyling(value)
                    }}
                />
                <DropDown
                    categories={parts}
                    listTop={{ marginTop: 32 }}
                    inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                    callback={(value) => partCallback(value)}
                    callbackQuantity={value => setHighlightStyling(value)}
                    quantityStyleState={highlightStyling}
                    callbackIngredientHighlight = { () => callbackIngredientHighlight(false) }
                />
            </View>
        </View>
    )
}

export default Quantity
