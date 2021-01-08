import React from 'react'
import { View } from 'react-native'
import DropDown from './DropDown'

const CategoryUnit = ({ categoryCallback, unitCallback, categories, units, callbackIngredientHighlight }) => {
    return (
        <View>
            <DropDown
                title={"Category"}
                listTop={{ top: 59 }}
                buttonStyle={{ marginTop: 7 }}
                categories={categories}
                callback={(value) => categoryCallback(value)}
                callbackQuantity={()=> {} }
                callbackIngredientHighlight = { () => callbackIngredientHighlight(false) }
            />
            <View style={{ zIndex: -1 }}>
                <DropDown
                    title={"Unit"}
                    categories={units}
                    buttonStyle={{ marginTop: 4 }}
                    inheritStyle={{ marginTop: 40 }}
                    listTop={{ top: 56 }}
                    callback={(value) => unitCallback(value)}
                    callbackQuantity={()=> {} }
                    callbackIngredientHighlight = { () => callbackIngredientHighlight(false) }
                />
            </View>
        </View>
    )
}

export default CategoryUnit
