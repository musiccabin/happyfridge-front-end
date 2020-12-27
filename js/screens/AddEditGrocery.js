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
import { DropDown, Incremental, Button } from '../components'

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

    const styles = StyleSheet.create({
        container: {
            ...globalStyles.content,
            paddingTop: 40,
            backgroundColor: COLORS.WHITE,
            ...globalStyles.container
        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30
        },
        leftContainer: {
            flexBasis: '55%',
        },
        rightContainer: {
            flexBasis: '40%',
        },
        input: {
            borderBottomColor: failedStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            borderBottomWidth: 1,
            marginTop: 20,
            paddingBottom: 4,
            paddingHorizontal: 4
        },
        quantityContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.BACKGROUND,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 7,
            borderTopLeftRadius: 0
        },
        quantityTitleContainer: {
            marginTop: 30,
            backgroundColor: COLORS.BACKGROUND,
            width: 80,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7
        },
        quantityTitle: {
            paddingTop: 7,
            paddingStart: 10,
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
            width: 145
        },
        ingredientText: {
            color: failedStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT
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
        Alert.alert(
            'Not a Singular Form',
            'Is the ingredient in singular form? (e.g. we want "apple" instead of "apples".)',
            [
                {
                    text: "Yes",
                    onPress: () => {
                        setFailedStyling(true)
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
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setIsUserTyping(false) }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={globalStyles.titleM}>
                        {categoryTitle}
                    </Text>
                    <Text style={globalStyles.titleM}>
                        {wholeTitle != 0 && wholeTitle} {partTitle != 0 && partTitle} {unitTitle}
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.ingredientText}>Ingredient</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={value => {
                                setIngredientValue(value)
                                setIsUserTyping(true)
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
                                        }}
                                        activeOpacity={0.1}
                                        underlayColor={COLORS.SECONDARY}
                                    >
                                        <Text style={styles.listText}>{item}</Text>
                                    </TouchableHighlight>
                            }
                        />}
                        <View style={styles.quantityTitleContainer}>
                            <Text style={styles.quantityTitle}>Quantity</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Incremental
                                inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                                callback={(value) => setWholeTitle(value)}
                            />
                            <DropDown
                                categories={parts}
                                listTop={{ marginTop: 32 }}
                                inheritStyle={{ flexBasis: '45%', paddingTop: 7 }}
                                callback={(value) => setPartTitle(value)}
                            />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={{ zIndex: 9 }}>
                            <DropDown
                                title={"Category"}
                                listTop={{ top: 59 }}
                                buttonStyle={{ marginTop: 7 }}
                                categories={category}
                                callback={(value) => setCategoryTitle(value)}
                            />
                        </View>
                        <DropDown
                            title={"Unit"}
                            categories={units}
                            buttonStyle={{ marginTop: 4 }}
                            callback={(value) => setUnitTitle(value)}
                            inheritStyle={{ marginTop: 40 }}
                            listTop={{ top: 56 }}
                        />
                        <Button
                            children={"Save"}
                            style={styles.button}
                            onPress={() => {
                                ingredientValue.slice(-1) == 's' || ingredientValue.slice(-2) == 'es'
                                    ? choiceAlert() : console.log('does not contain')
                            }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AddEditGrocery