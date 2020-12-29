import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ViewPager from '@react-native-community/viewpager'

const Carousel = () => {
  return (
    <ViewPager
      style={styles.viewPager}
      initialPage={0}
      showPageIndicator={true}
    >
      <View style={styles.page} key='1'>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://dinnerthendessert.com/wp-content/uploads/2016/12/Slow-Cooker-Indian-Butter-Chicken.jpg',
          }}
        />
      </View>
      <View style={styles.page} key='2'>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://www.wellplated.com/wp-content/uploads/2019/07/Authentic-Indian-Butter-Chicken-recipe-600x900.jpg',
          }}
        />
      </View>
      <View style={styles.page} key='3'>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://ifoodreal.com/wp-content/uploads/2014/02/far-crock-pot-butter-chicken-recipe.jpg',
          }}
        />
      </View>
    </ViewPager>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    height: '55%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
})

export default Carousel
