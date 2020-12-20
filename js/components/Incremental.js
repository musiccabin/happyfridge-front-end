import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { COLORS } from '../styles'

const DropDown = ({ inheritStyle, callback }) => {

    const [value, setValue] = useState(1)

    function handleDecrement(value) {
        setValue(value)
        callback(value)
    }

    return (
        <View style={inheritStyle}>
            <View style={styles.container}>
                <Pressable onPress={() => { setValue(value + 1); callback(value + 1) }}>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: 'https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg'
                        }}
                    />
                </Pressable>
                <Text style={styles.text}>{value}</Text>
                <Pressable onPress={() => { value > 0 && handleDecrement(value-1) }}>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: 'https://cdn0.iconfinder.com/data/icons/typicons-2/24/minus-512.png'
                        }}
                    />
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
        width: 20,
        height: 20,
    },
    line: {
        borderBottomColor: COLORS.PRIMARY_FONT,
        borderBottomWidth: 1,
        paddingTop: 7
    },
});

export default DropDown