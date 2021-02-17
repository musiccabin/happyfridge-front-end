import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { globalStyles } from '../styles'

const UsageBar = ({ name, quantity, unit }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={[globalStyles.titleM], { textTransform: 'capitalize' }}>
                {name}
            </Text>
            <Text style={globalStyles.titleM}>
                {quantity} {unit}
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