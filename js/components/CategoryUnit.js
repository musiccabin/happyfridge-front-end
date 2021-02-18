import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import DropDown from './DropDown'
import { useQuery } from '@apollo/client'
import { ingredientInfoQuery } from '../graphql/queries'
import { COLORS } from '../styles'

const CategoryUnit = ({ categoryCallback,
    unitCallback,
    categories,
    // units,
    callbackIngredientHighlight,
    ingredientCategory,
    defaultUnitSelection,
    ingredient }) => {

        const styles = StyleSheet.create({
            container : {
                flex            : 1,
                // backgroundColor : COLORS.BACKGROUND,
                alignItems      : "center",
                justifyContent  : "center",
                paddingLeft: 30,
                paddingBottom: 15,
            },
            // quantityContainer: {
            //     flexDirection: 'row',
            //     justifyContent: 'space-around',
            //     alignItems      : "center",
            //     justifyContent  : "center",
            //     // backgroundColor: COLORS.BACKGROUND,
            //     paddingLeft: 10,
            //     paddingRight: 30,
            //     paddingVertical: 10,
            //     borderRadius: 7,
            //     borderTopLeftRadius: 0,
            // },
            // quantityTitleContainer: {
            //     // backgroundColor: COLORS.BACKGROUND,
            //     width: 80,
            //     borderTopLeftRadius: 7,
            //     borderTopRightRadius: 7
            // },
            // quantityTitle: {
            //     color: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            //     paddingTop: 7,
            //     paddingBottom: 7,
            //     paddingStart: 10,
            // },
            // line: {
            //     borderBottomColor: highlightStyling ? COLORS.PRIMARY : COLORS.PRIMARY_FONT,
            //     borderBottomWidth: 1,
            //     paddingTop: 7
            // },
            // icon: {
            //     color: COLORS.SECONDARY_FONT,
            //     position: 'absolute',
            //     right: 10,
            //     top: 3
            // },
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
                height: '30%',
                paddingStart: 10,
                paddingTop: 10,
            },
            })

        // console.log('ingredient is: ', ingredient)
    
    // const [foundCategory, setCategory] = useState('Produce')
    const [temp, setTemp] = useState(false)
    
    const categoryItems = []
    for (let category of categories) {
        categoryItems.push({
            label: category,
            value: category
        })
    }

    const findCategory = (data) => {
        const category = data?.ingredientInfo?.category
        if (category && category != ingredientCategory.toLowerCase()) {
            const ingredientCat = category.charAt(0).toUpperCase() + category.slice(1)
            if (ingredientCat === 'NutsAndSeeds') ingredientCat = 'Nuts & Seeds'
            categoryCallback(ingredientCat)
            return ingredientCat
        }
    }

    const unitItems = (data) => {
        const category = data?.ingredientInfo?.category
        let units = []
        if (category) {
            switch (category) {
                case 'produce':
                    units = ["", 'cup', 'tbsp', 'tsp']
                    break
                case 'meat':
                    units = ["", 'lb', 'kg', 'oz', 'g', 'cup']
                    break
                case 'frozen':
                    units = ['', 'lb', 'kg', 'oz', 'g', 'cup', 'tbsp']
                    break
                case 'dairy':
                    units = ['', 'lb', 'kg', 'oz', 'g', 'l', 'ml', 'cup', 'tbsp', 'tsp']
                    break
                case 'nuts & seeds':
                    units = ['lb', 'oz', 'g', 'cup', 'tbsp', 'tsp']
                    break
                case 'other':
                    units = ['', 'lb', 'kg', 'oz', 'g', 'cup', 'tbsp', 'tsp']
                default:
                    units = ['']
            }
        }
        const pickerItems = []
        for (let unit of units) {
            pickerItems.push({
                label: unit,
                value: unit
            })
        }
        return pickerItems
    }

    const { data, loading, error } = useQuery(ingredientInfoQuery, {
        variables: {name: ingredient.toLowerCase()}
        })

    if (loading) return null
    if (error) console.error(error)

    return (
        <View style={{height: '50%'}}>
            {ingredient ? <Text style={styles.text}>Unit</Text> : null}
            {ingredient ?
            <Pressable style={styles.buttonStyle} onPress={() => {
                temp ? unitCallback(false) : unitCallback(defaultUnitSelection || '')
            }}>
                <RNPickerSelect
                    value={defaultUnitSelection}
                    useNativePickerStyle={false}
                    onValueChange={(value) => {
                        callbackIngredientHighlight(value)
                        setTemp(value)
                        unitCallback(value)
                    }}
                    items={unitItems(data)}
                    placeholder={{}}
                />
            </Pressable> : null}
            <Text style={styles.text}>Category</Text>
            <Pressable style={styles.buttonStyle} onPress={() => {
                    temp ? categoryCallback(false) : categoryCallback(true)
                }}>
                    <RNPickerSelect
                        value={ingredient ? findCategory(data) : ingredientCategory}
                        useNativePickerStyle={false}
                        onValueChange={(value) => {
                            callbackIngredientHighlight(value)
                            setTemp(value)
                            categoryCallback(value)
                        }}
                        items={categoryItems}
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
            {/* <DropDown
                title={"Category"}
                defaultSelection={ingredient ? findCategory(data) : ingredientCategory}
                listTop={{ top: 59 }}
                buttonStyle={{ marginTop: 7 }}
                categories={categories}
                // callback={(value) => categoryCallback(value)}
                callbackQuantity={() => { }}
                callbackIngredientHighlight={() => callbackIngredientHighlight(false)}
            /> */}
            {/* <View style={{ zIndex: -1 }}>
                <DropDown
                    title={"Unit"}
                    defaultSelection={""}
                    categories={units((data))}
                    buttonStyle={{ marginTop: 4 }}
                    inheritStyle={{ marginTop: 40 }}
                    listTop={{ top: 56 }}
                    callback={(value) => unitCallback(value)}
                    callbackQuantity={() => { }}
                    callbackIngredientHighlight={() => callbackIngredientHighlight(false)}
                    defaultSelection={defaultUnitSelection}
                />
            </View> */}
        </View>
    )
}

export default CategoryUnit
