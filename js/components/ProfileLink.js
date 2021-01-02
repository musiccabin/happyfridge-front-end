import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'

const ProfileLink = ({ to, name, icon, onPress }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <View style={styles.option}>
        <View style={styles.optionInfo}>
          <AntDesign
            name={icon}
            style={styles.optionIcon}
            size={24}
            color={COLORS.SECONDARY_FONT}
          />
          <Text style={globalStyles.titleM}>{name}</Text>
        </View>
        <Ionicons
          name='ios-arrow-forward'
          style={styles.optionIcon}
          size={22}
          color={COLORS.SECONDARY_FONT}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  option: {
    ...globalStyles.row,
    marginVertical: 20,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 20,
  },
})

export default ProfileLink
