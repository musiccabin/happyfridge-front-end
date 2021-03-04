import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, FlatList, Pressable } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { COLORS, globalStyles } from '../styles'
import { Ionicons } from '@expo/vector-icons'

const DemographicFilter = ({ inheritStyle, listZIndex,
    buttonStyle, listTop, data, provAndCities, provField, updateCities, initVal, keepSelectedCity, keepSelectedProv, resetQueries, updateGraph, updateCounts }) => {

    const items = []
    if (data) {
        for (let item of data) {
            items.push({
                label: item,
                value: item
            })
        }
    }


    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [selectedVal, setSelectedVal] = useState(initVal)
    
    // const [icon, setIcon] = useState('ios-arrow-up')
    const [highlightStyling, setHighlightStyling] = useState(false)

    const styles = StyleSheet.create({
        titleText: {
            color: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            marginBottom: 10,
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
            paddingStart: 5,
            paddingEnd: 15,
        },
        icon: {
            color: COLORS.SECONDARY_FONT,
        },
        list: {
            backgroundColor: COLORS.PRIMARY_ICON,
            borderRadius: 5,
            position: 'absolute',
            right: 0,
            left: 0,
            zIndex: listZIndex,
            ...listTop
        }
    })

    const Separator = () => {
        return <View style={styles.separatorLine}></View>
    }

    const toggle = () => {
        setPickerVisibility(!pickerVisibility)
        setIcon(pickerVisibility ? 'ios-arrow-up' : 'ios-arrow-down')
        setHighlightStyling(!highlightStyling)
    }

    return (
        <View style={inheritStyle}>
            <Pressable
            style={buttonStyle}
            onPress={() => {
                // toggle()
            }}>
            <RNPickerSelect
                value={selectedVal}
                onValueChange={(value) => {
                    if (value) {
                        if (provField) {
                            updateCities(provAndCities[value])
                            keepSelectedProv(value)
                        } else {
                            keepSelectedCity(value)
                        }
                        setSelectedVal(value)
                        resetQueries()
                        updateCounts()
                        updateGraph()
                    }
                }}
                items={items}
                placeholder={ provField ? { label: 'Pick a province...', value: null } : { label: 'Pick a city...', value: null }}
            />
                {/* <Text style={styles.text}>{selectedCategory}</Text> */}
                {/* <Ionicons
                    style={styles.icon}
                    size={globalStyles.iconSize}
                    name={icon}
                    color={COLORS.SECONDARY_FONT}
                /> */}
            </Pressable>
            {pickerVisibility &&
                <FlatList
                    style={styles.list}
                    // data={categories}
                    ItemSeparatorComponent={Separator}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={
                        ({ item }) =>
                            <TouchableHighlight
                                onPress={() => {
                                    callback(item)
                                    // toggle()
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

export default DemographicFilter
