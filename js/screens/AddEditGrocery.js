import React, { useState } from 'react'
import {
    View, Text,
    StyleSheet,
    FlatList,
    Alert,
    TextInput,
    TouchableHighlight,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { COLORS, globalStyles } from '../styles'
import { Button, CategoryUnit, Quantity, UsageBar } from '../components'

const AddEditGrocery = () => {

    const category = ["Dairy", "Nuts and Seeds", "Meat", "Produce", "Frozen"]
    const ingredientArray = ["Apple", "Mango", "Carrot", "Spice", "Orange", "Cajun"]
    const parts = ["1/4", "1/3", "1/3", "2/3", "0"]
    const units = ["kg", "lb"]
    const [categoryTitle, setCategoryTitle] = useState(category[0])
    const [wholeTitle, setWholeTitle] = useState("1")
    const [partTitle, setPartTitle] = useState(parts[0])
    const [unitTitle, setUnitTitle] = useState(units[0])
    const [ingredientValue, setIngredientValue] = useState('')
    const [ingredients, setIngredients] = useState(ingredientArray)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [failedStyling, setFailedStyling] = useState(false)
    const [highlightStyling, setHighlightStyling] = useState(false)

    const styles = StyleSheet.create({
        container: {
            ...globalStyles.content,
            paddingTop: 40,
            backgroundColor: COLORS.WHITE,
            ...globalStyles.container
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 70
        },
        leftContainer: {
            flexBasis: '55%',
        },
        rightContainer: {
            flexBasis: '40%'
        },
        input: {
            borderBottomColor: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT,
            borderBottomWidth: 1,
            marginTop: 20,
            paddingBottom: 4,
            paddingHorizontal: 4
        },
        ingredientText: {
            color: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT
        },
        list: {
            backgroundColor: COLORS.PRIMARY_ICON,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 59,
            zIndex: 100
        },
        listText: {
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        separatorLine: {
            borderBottomColor: COLORS.PRIMARY_FONT,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        button: {
            marginTop: 60,
            width: 145,
            zIndex: -2
        }
    })

    const Separator = () => {
        return <View style={styles.separatorLine}></View>
    }

    const filteredIngredientArray = (value) => {
        let tempArray = ingredientArray.filter(item => {
            if (item.toLocaleLowerCase().includes(value.toLocaleLowerCase())) return item
        })
        setIngredients(tempArray)
    }

    const choiceAlert = () => {
        setHighlightStyling(false)
        setFailedStyling(false)
        Alert.alert(
            'Not a Singular Form',
            'Is the ingredient in singular form? (e.g. we want "apple" instead of "apples".)',
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setFailedStyling(true)
                        setIngredientValue(ingredientValue.slice(0, -1))
                    },
                    style: "cancel"
                },
                {
                    text: "No", onPress: () => {
                        //TODO!: ADD TO LIST
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            setIsUserTyping(false)
            setHighlightStyling(false)
            setFailedStyling(false)
        }}>
            <View style={styles.container}>
                <UsageBar
                    categoryTitle={categoryTitle}
                    wholeTitle={wholeTitle}
                    partTitle={partTitle}
                    unitTitle={unitTitle}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.ingredientText}>Ingredient</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={value => {
                                setIngredientValue(value)
                                setIsUserTyping(true)
                                setHighlightStyling(true)
                                value.length == 0 ? setIsUserTyping(false) : filteredIngredientArray(value)
                            }}
                            value={ingredientValue}
                            maxLength={50}
                        />
                        {isUserTyping && <FlatList
                            style={styles.list}
                            data={ingredients}
                            ItemSeparatorComponent={Separator}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={
                                ({ item }) =>
                                    <TouchableHighlight
                                        onPress={() => {
                                            setIngredientValue(item)
                                            setIsUserTyping(false)
                                            setHighlightStyling(false)
                                        }}
                                        activeOpacity={0.1}
                                        underlayColor={COLORS.SECONDARY}
                                    >
                                        <Text style={styles.listText}>{item}</Text>
                                    </TouchableHighlight>
                            }
                        />}
                        <View style={{ marginTop: 30 }}>
                            <Quantity
                                wholeCallback={(value) => setWholeTitle(value)}
                                partCallback={(value) => setPartTitle(value)}
                                parts={parts}
                                callbackIngredientHighlight={ () => setHighlightStyling(false) }
                            />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <CategoryUnit
                            categories={category}
                            units={units}
                            categoryCallback={(value) => setCategoryTitle(value)}
                            unitCallback={(value) => setUnitTitle(value)}
                            callbackIngredientHighlight={ () => setHighlightStyling(false) }
                        />
                        <Button
                            children={"Save"}
                            style={styles.button}
                            onPress={() => {
                                if (ingredientValue.slice(-1) == 's' || ingredientValue.slice(-2) == 'es') choiceAlert()
                            }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddEditGrocery