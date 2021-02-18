import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import DropDown from './DropDown'
import Incremental from './Incremental'
import { COLORS, globalStyles } from '../styles'
import { Ionicons } from '@expo/vector-icons'

const Quantity = ({ wholeCallback, partCallback, parts, whole, part }) => {

    const [highlightStyling, setHighlightStyling] = useState(false)
    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [temp, setTemp] = useState(false)
    const [icon, setIcon] = useState('ios-arrow-up')

    const items = []
    for (let part of parts) {
        items.push({
            label: part,
            value: part
        })
    }

    const callbackQuantity = (value) => {
        setHighlightStyling(value)
        setTemp(value)
    }

    const toggle = () => {
        setPickerVisibility(!pickerVisibility)
        setIcon(pickerVisibility ? 'ios-arrow-up' : 'ios-arrow-down')
    }

    const styles = StyleSheet.create({
        container : {
            flex            : 1,
            backgroundColor : COLORS.BACKGROUND,
            alignItems      : "center",
            justifyContent  : "center",
            paddingLeft: 30,
            paddingBottom: 15,
        },
        quantityContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems      : "center",
            justifyContent  : "center",
            // backgroundColor: COLORS.BACKGROUND,
            paddingLeft: 10,
            paddingRight: 30,
            paddingVertical: 10,
            borderRadius: 7,
            borderTopLeftRadius: 0,
        },
        quantityTitleContainer: {
            // backgroundColor: COLORS.BACKGROUND,
            width: 80,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7
        },
        quantityTitle: {
            color: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            paddingTop: 7,
            paddingBottom: 7,
            paddingStart: 10,
        },
        line: {
            borderBottomColor: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            borderBottomWidth: 1,
            paddingTop: 7
        },
        icon: {
            color: COLORS.SECONDARY_FONT,
            position: 'absolute',
            right: 10,
            top: 3
        },
        buttonStyle: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems      : "center",
            justifyContent  : "center",
            borderColor: 'white',
            // backgroundColor: COLORS.PRIMARY,
            borderWidth: 1,
            borderBottomColor: COLORS.PRIMARY_FONT,
            paddingVertical: 5,
            paddingHorizontal: 10,
            // borderRadius: 10,
            marginBottom: 5,
            // marginTop: 10,
          },
          text: {
            // width: '10%',
            paddingStart: 10
        },
        })

    return (
        <View>
            <View style={styles.quantityTitleContainer}>
                <Text style={styles.quantityTitle}>Quantity</Text>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.text}>Whole: </Text>
                <Incremental
                    initVal={whole}
                    inheritStyle={{ flexBasis: '45%' }}
                    callback={(value) => wholeCallback(value)}
                    callbackLineColor={value => {
                        setHighlightStyling(value)
                        setTemp(!value)
                    }}
                />
                <Text style={styles.text}>Part: </Text>
                {/* <View stye={styles.quantityContainer}> */}
                <Pressable style={styles.buttonStyle} onPress={() => {
                    toggle()
                    temp ? callbackQuantity(false) : callbackQuantity(true)
                }}>
                    <RNPickerSelect
                        value={part}
                        useNativePickerStyle={false}
                        onValueChange={(value) => {
                            setHighlightStyling(value)
                            setTemp(value)
                            partCallback(value)
                        }}
                        items={items}
                        placeholder={{}}
                    />

                    {/* <Text style={styles.text}>{selectedCategory}</Text> */}
                    {/* <Ionicons
                        style={styles.icon}
                        size={globalStyles.iconSize}
                        name={icon}
                        color={COLORS.SECONDARY_FONT}
                    /> */}
                </Pressable>
                {/* </View> */}

                {/* <DropDown
                    categories={parts}
                    defaultSelection={part}
                    listTop={{ marginTop: 32 }}
                    inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                    callback={(value) => partCallback(value)}
                    quantityStyleState={temp}
                    callbackQuantity={value => {
                        setHighlightStyling(value)
                        setTemp(value)
                    }}
                /> */}
            </View>
        </View>
    )
}

export default Quantity
