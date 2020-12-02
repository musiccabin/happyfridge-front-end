import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, globalStyles } from '../styles'

const Card = ({ onPress, marginTop, marginBottom, marginRight, height, width }) => {

  const styles = StyleSheet.create({
    card: {
      height: height,
      flexDirection: 'column',
      width: width,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom:marginBottom
    },
    cardImage: {
      height: 150,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  })

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, globalStyles.card]}>
        <Image
          style={[styles.cardImage, globalStyles.cardImage]}
          source={{
            uri:
              'https://cdn.zeplin.io/5f84bab3e28dc983c2bcd193/assets/D4588D2A-5A54-4A19-B2E3-FF60A0CCC37C.png',
          }}
        />
        <View style={[styles.cardInfo, globalStyles.cardInfo]}>
          <Text style={globalStyles.titleL}>Shakshuka</Text>
          <View style={globalStyles.cardDetails}>
            <View style={globalStyles.cardTimer}>
              <MaterialIcons
                style={globalStyles.clock}
                name='access-time'
                size={20}
                color={COLORS.SECONDARY_FONT}
              />
              <Text style={globalStyles.titleS}>20 mins</Text>
            </View>
            <View style={globalStyles.icons}>
              <MaterialIcons
                name='remove-circle'
                size={24}
                style={globalStyles.icon}
                color={COLORS.PRIMARY_ICON}
              />
              <MaterialIcons
                name='favorite'
                size={24}
                color={COLORS.SECONDARY_ICON}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default Card
