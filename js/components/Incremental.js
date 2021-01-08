import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { Feather } from '@expo/vector-icons';

const Incremental = ({ inheritStyle, callback, callbackLineColor }) => {

    const [value, setValue] = useState(1)

    function handleDecrement(value) {
        setValue(value)
        callback(value)
    }

    function handleManual(value) {
        setValue(value)
        callback(value)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => callbackLineColor(false), 2000);
        return () => clearTimeout(timeoutId);
      }, [value]);

    return (
        <View style={inheritStyle}>
            <View style={styles.container}>
                <Pressable onPress={() => {
                    setValue(value + 1)
                    callback(value + 1)
                }}>
                    <Feather name="plus" size={globalStyles.iconSize} style={styles.icon} color="black" />
                </Pressable>
                <TextInput
                    style={styles.text}
                    onChangeText={text => {
                        text.length != 0 ? handleManual(parseInt(text)) : handleManual(0)
                        callbackLineColor(true)
                    }}
                    multiline={false}
                    keyboardType={'numeric'}
                    maxLength={3}
                    value={value.toString()}
                />
                <Pressable onPress={() => { value > 0 && handleDecrement(value - 1) }}>
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
        justifyContent: 'space-between',
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
});

export default Incremental