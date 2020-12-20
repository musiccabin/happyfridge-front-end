import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, FlatList, Pressable } from 'react-native'
import { COLORS, globalStyles } from '../styles'

const DropDown = ({ title, categories, inheritStyle, callback }) => {

    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(categories[0].itemName)
    const [image, setImage] = useState('https://assets.stickpng.com/images/58f8bd170ed2bdaf7c128308.png')

    const Separator = () => {
        return <View style={styles.separatorLine}></View>
    }

    const toggle = () => {
        setPickerVisibility(!pickerVisibility)
        setImage(pickerVisibility ? 'https://assets.stickpng.com/images/58f8bd170ed2bdaf7c128308.png' : "https://cdn.iconscout.com/icon/free/png-256/top-arrow-25-1112318.png")
    }

    return (
        <View style={inheritStyle}>
            { title && <Text style={[globalStyles.titleS], styles.titleText}>{title}</Text>}
            <Pressable onPress={() => toggle()}>
                <Text style={styles.text}>{selectedCategory}</Text>
                <View style={styles.line}></View>
                <Image
                    style={styles.icon}
                    source={{
                        uri: image
                    }}
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
                                onPress={() => { callback(item.itemName); setSelectedCategory(item.itemName); toggle() }}
                                activeOpacity={0.1}
                                underlayColor={COLORS.SECONDARY}
                            >
                                <Text style={styles.listText}>{item.itemName}</Text>
                            </TouchableHighlight>
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        marginBottom: 10
    },
    line: {
        borderBottomColor: COLORS.PRIMARY_FONT,
        borderBottomWidth: 1,
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
        padding: 5
    },
    icon: {
        width: 15,
        height: 15,
        position: 'absolute',
        right: 10,
        top: 7
    },
    list: {
        backgroundColor: COLORS.PRIMARY_ICON,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
});

export default DropDown