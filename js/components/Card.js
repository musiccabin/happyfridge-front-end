import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'

const Card = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri:
            'https://cdn.zeplin.io/5f84bab3e28dc983c2bcd193/assets/D4588D2A-5A54-4A19-B2E3-FF60A0CCC37C.png',
        }}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>Shakshuka</Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardTimer}>
            <Feather style={styles.clock} name='clock' size={20} color='gray' />
            <Text>20 mins</Text>
          </View>
          <View style={styles.icons}>
            <AntDesign
              name='minuscircle'
              style={styles.icon}
              size={20}
              color='rgb(255, 209, 136)'
            />
            <AntDesign name='heart' size={20} color='rgb(255, 123, 92)' />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    height: 150,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
    width: 250,
    marginRight: 25,
  },
  cardTitle: {
    paddingVertical: 5,
    fontSize: 18,
  },
  cardImage: {
    height: '100%',
    width: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    paddingRight: 5,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    paddingRight: 10,
  },
})

export default Card
