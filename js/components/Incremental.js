import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { Feather } from '@expo/vector-icons';

const Incremental = ({ inheritStyle, callback, callbackLineColor, initVal }) => {

    // console.log('initVal is: ', initVal)
    const [value, setValue] = useState(initVal)

    useEffect(() => {
        callback(value)
    }, [value])

    return (
        <View style={inheritStyle}>
            <View style={styles.container}>
                <Pressable onPress={() => {
                    setValue(value + 1)
                }}>
                    <Feather name="plus" size={globalStyles.iconSize} style={styles.icon} color="black" />
                </Pressable>
                <TextInput
                    style={styles.text}
                    onChangeText={text => {
                        text.length != 0 ? setValue(parseInt(text)) : setValue(0)
                        callbackLineColor(true)
                    }}
                    multiline={false}
                    keyboardType={'numeric'}
                    maxLength={3}
                    value={value.toString()}
                />
                <Pressable onPress={() => { value > 0 && setValue(value - 1) }}>
                    <Feather name="minus" size={globalStyles.iconSize} style={styles.icon} color="black" />
                </Pressable>
            </View>
            <View style={styles.line}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    icon: {
        top: 3,
        color: COLORS.SECONDARY_FONT
    },
    line: {
        borderBottomColor: COLORS.PRIMARY_FONT,
        borderBottomWidth: 1,
        paddingTop: 5.5
    },
})

export default Incremental