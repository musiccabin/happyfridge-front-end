import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { globalStyles } from '../styles'

const UsageBar = ({ categoryTitle, wholeTitle, partTitle, unitTitle }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={[globalStyles.titleM], { textTransform: 'capitalize' }}>
                {categoryTitle}
            </Text>
            <Text style={globalStyles.titleM}>
                {wholeTitle != 0 && wholeTitle} {partTitle != 0 && partTitle} {unitTitle}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default UsageBar