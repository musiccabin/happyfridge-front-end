import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, FlatList, Pressable } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { Ionicons } from '@expo/vector-icons'

const DropDown = ({ title, categories, inheritStyle, listZIndex, 
    callback, buttonStyle, listTop, callbackQuantity, quantityStyleState, callbackIngredientHighlight }) => {

    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories[0])
    const [icon, setIcon] = useState('ios-arrow-up')
    const [highlightStyling, setHighlightStyling] = useState(false)

    const styles = StyleSheet.create({
        titleText: {
            color: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            marginBottom: 10
        },
        line: {
            borderBottomColor: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            borderBottomWidth: 1,
            paddingTop: 7
        },
        separatorLine: {
            borderBottomColor: COLORS.PRIMARY_FONT,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        listText: {
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        text: {
            width: '90%',
            paddingStart: 10
        },
        icon: {
            color: COLORS.SECONDARY_FONT,
            position: 'absolute',
            right: 10,
            top: 3
        },
        list: {
            backgroundColor: COLORS.PRIMARY_ICON,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            position: 'absolute',
            right: 0,
            left: 0,
            zIndex: listZIndex,
            ...listTop
        }
    });

    const Separator = () => {
        return <View style={styles.separatorLine}></View>
    }

    const toggle = () => {
        setPickerVisibility(!pickerVisibility)
        setIcon(pickerVisibility ? 'ios-arrow-up' : 'ios-arrow-down')
        highlightStyling ? setHighlightStyling(false) : setHighlightStyling(true)
    }

    return (
        <View style={inheritStyle}>
            {title && <Text style={[globalStyles.titleS], styles.titleText}>{title}</Text>}
            <Pressable style={buttonStyle} onPress={() => {
                toggle()
                quantityStyleState ? callbackQuantity(false) : callbackQuantity(true)
                callbackIngredientHighlight(false)
            }}>
                <Text style={styles.text}>{selectedCategory}</Text>
                <View style={styles.line}></View>
                <Ionicons
                    style={styles.icon}
                    size={globalStyles.iconSize}
                    name={icon}
                    color={COLORS.SECONDARY_FONT}
                />
            </Pressable>
            {pickerVisibility &&
                <FlatList
                    style={styles.list}
                    data={categories}
                    ItemSeparatorComponent={Separator}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={
                        ({ item }) =>
                            <TouchableHighlight
                                onPress={() => {
                                    callback(item)
                                    setSelectedCategory(item)
                                    toggle()
                                    callbackQuantity(false)
                                }}
                                activeOpacity={0.1}
                                underlayColor={COLORS.SECONDARY}
                            >
                                <Text style={styles.listText}>{item}</Text>
                            </TouchableHighlight>
                    }
                />
            }
        </View>
    )
}

export default DropDown
