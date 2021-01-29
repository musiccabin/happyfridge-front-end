import React, { useState } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, globalStyles } from '../styles'

const TimeFilter = ({ filter, timeFilterCallback }) => {

    const [selectedButton, setSelectedButton] = useState(1)

    const styles = StyleSheet.create({
        timeButton: {
            width: 100,
            marginRight: 10,
            paddingVertical: 5,
        },
        buttonInactive: {
            backgroundColor: COLORS.BACKGROUND
        },
        buttonActive: {
            backgroundColor: COLORS.PRIMARY
        },
        margin: {
            marginRight: 30
        }
    })

    return (
        <FlatList
            data={filter}
            horizontal
            style={{ paddingStart: 20 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={item =>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedButton(item.item.id)
                        timeFilterCallback(item.item.id)
                    }}
                    style={[globalStyles.button,
                    styles.timeButton, item.item.id == selectedButton ? styles.buttonActive : styles.buttonInactive,
                    item.item.id == filter.length ? styles.margin : null
                    ]}>
                    <Text style={globalStyles.titleM}>{item.item.title}</Text>
                </TouchableOpacity>
            }
        />
    )
}

export default TimeFilter