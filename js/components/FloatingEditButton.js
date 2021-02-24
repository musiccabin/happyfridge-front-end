import React from 'react'
import { View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { COLORS } from '../styles'

const FloatingEditButton = ({ componentName, recipeId }) => {
    const navigation = useNavigation()

    return (
        <View style={{ position: 'absolute', bottom: 25, right: 30 }}>
            <Pressable onPress={() => navigation.navigate(componentName, {
                item: {},
                editIngredient: true,
                recipeId: recipeId
            })}>
                <AntDesign name="pluscircle" size={32} color={COLORS.PRIMARY} />
            </Pressable>
        </View>
    )
}

export default FloatingEditButton