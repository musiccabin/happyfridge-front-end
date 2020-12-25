import React from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from 'react-native'
import { VictoryPie } from 'victory-native'
import { COLORS, globalStyles } from '../styles'

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          The header will go here on the next PR.
        </Text>
      </View>
      <View style={styles.chart}>
        <VictoryPie
          animate={{ duration: 2000 }}
          cornerRadius={5}
          data={[
            { x: 'meat', y: 25, z: '10lb' },
            { x: 'frozen', y: 25, z: '9lb' },
            { x: 'produce', y: 17, z: '8lb' },
            { x: 'dairy', y: 13, z: '7lb' },
            { x: 'nuts & seeds', y: 9, z: '5lb' },
            { x: 'others', y: 6, z: '3lb' },
          ]}
          padding={{ top: 100, bottom: 50 }}
          colorScale={[
            '#ec6762',
            '#ee8165',
            '#f29e66',
            '#fbe05e',
            '#59bb40',
            '#5cc6ba',
          ]}
          labels={({ datum }) => `${datum.x}\n${datum.z}`}
          innerRadius={78}
          padAngle={2}
        />
      </View>
      <Text style={styles.title}>Top 10 meat ingridients used</Text>
      <ScrollView style={styles.ingridients}>
        <View style={styles.ingridient}>
          <Text style={globalStyles.titleL}>Chicken (x5)</Text>
          <Text style={globalStyles.titleL}>10lb</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: COLORS.WHITE,
  },
  headerText: {
    marginTop: 25,
    textAlign: 'center',
  },
  chart: {
    borderBottomColor: COLORS.SEPARATOR,
    borderBottomWidth: 0.3,
  },
  ingridients: {
    paddingHorizontal: 20,
  },
  title: {
    ...globalStyles.titleXL,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  ingridient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default Dashboard
