import React, { useState } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, globalStyles } from '../styles'

const TimeFilter = ({ curVal, filter, timeFilterCallback, selectedButton, setSelectedFromTimeFilter, shouldScroll, setScroll }) => {
    const [listRef, setListRef] = useState()

    const handleScroll = (index) => {
      listRef.scrollToIndex({
        index: index,
        viewPosition: 0,
      })
    }

    if (listRef && shouldScroll) {
        handleScroll(0)
        setScroll(false)
    }

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
            ref={(list) => setListRef(list)}
            data={filter}
            value={curVal}
            horizontal
            style={{ paddingStart: 20 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            getItemLayout={(data, index) => (
                {length: 50, offset: 50 * index, index}
              )}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    onPress={() => {
                        handleScroll(index)
                        setSelectedFromTimeFilter(item.id)
                        timeFilterCallback(item.id)
                    }}
                    style={[globalStyles.button,
                    styles.timeButton, item.id == selectedButton ? styles.buttonActive : styles.buttonInactive,
                    item.id == filter.length ? styles.margin : null
                    ]}>
                    <Text style={globalStyles.titleM}>{item.title}</Text>
                </TouchableOpacity>
            }
        />
    )
}

export default TimeFilter