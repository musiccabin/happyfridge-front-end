import React from 'react'
import { FlatList, StyleSheet, Pressable, Text } from 'react-native'
import { COLORS, globalStyles, windowWidth } from '../styles'

const CheckList = ({ data, inheritStyles, callback }) => {

    return (
        <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={data}
            numColumns={3}
            style={inheritStyles}
            renderItem={
                ({ item }) =>
                    <Pressable
                        onPress={() => callback(item.title)}
                        disabled={item.visibility}
                        style={[styles.button, item.checked ? styles.checkedButton : styles.unCheckedButton, item.visibility && styles.hidden]}>
                        <Text style={globalStyles.titleM}>{item.title}</Text>
                    </Pressable>
            }
        />
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 10,
        width: ((windowWidth - 60) / 3) - 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: COLORS.PRIMARY,
        marginVertical: 10,
        borderWidth: 1
    },
    checkedButton: {
        backgroundColor: COLORS.WHITE,
    },
    unCheckedButton: {
        backgroundColor: COLORS.PRIMARY_ICON,
    },
    hidden: {
        opacity: 0
    }
})

export default CheckList