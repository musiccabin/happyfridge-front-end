import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'

const Recipe = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImageWrapper}>
        <Image
          style={styles.cardImage}
          source={{
            uri:
              'https://cafedelites.com/wp-content/uploads/2016/11/Creamy-Herb-Chicken-2700.jpg',
          }}
        />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>Creamy Herb Chicken</Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardTimer}>
            <Feather style={styles.clock} name='clock' size={20} color='gray' />
            <Text>20 mins</Text>
          </View>
          <View style={styles.icons}>
            <AntDesign
              name='pluscircle'
              style={styles.icon}
              size={20}
              color='rgb(255, 209, 136)'
            />
            <AntDesign name='hearto' size={20} color='rgb(255, 159, 136)' />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    flexDirection: 'row',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 25,
  },
  cardTitle: {
    paddingVertical: 5,
    fontSize: 18,
  },
  cardImageWrapper: {
    flexBasis: '30%',
  },
  cardImage: {
    height: '100%',
    width: 'auto',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexBasis: '70%',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
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

export default Recipe
