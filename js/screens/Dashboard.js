import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import { VictoryPie } from 'victory-native'
import { COLORS, globalStyles } from '../styles'
import { TimeFilter, DemographicFilter } from '../components'
import { useLazyQuery } from '@apollo/client'
import {
  dashboardIndStatsLastWeekQuery,
  dashboardIndStatsLast30DaysQuery,
  dashboardIndStatsLast6MonthsQuery,
  dashboardIndStatsLast90DaysQuery,
  dashboardIndStatsThisYearQuery
} from '../graphql/queries'

const Dashboard = () => {

  const timeFilter = [
    {
      id: "1",
      title: "7 days",
      query: dashboardIndStatsLastWeekQuery
    },
    {
      id: "2",
      title: "30 days",
      query: dashboardIndStatsLast30DaysQuery
    },
    {
      id: "3",
      title: "3 months",
      query: dashboardIndStatsLast90DaysQuery
    },
    {
      id: "4",
      title: "6 months",
      query: dashboardIndStatsLast6MonthsQuery
    },
    {
      id: "5",
      title: "this year",
      query: dashboardIndStatsThisYearQuery
    },
  ]
  const demography = {
    province: ["BC", "AB"],
    city: ["Vancouver", "Langley", "Surrey"],
    region: ["Fraser Valley", "Delta Creek", "South Surrey"]
  }

  const [timeFilterNumber, setTimeFilterNumber] = useState(1)
  const [graphData, setGraphData] = useState([])
  const [timeQuery, setTimeQuery] = useState(dashboardIndStatsLastWeekQuery)
  const [updateGraph, { lazyLoading, data }] = useLazyQuery(timeQuery)

  useEffect(() => {
    updateGraph()
    //TODO! using useLazyQuery on first load is causing glitch, may use useQuery for first time load 
  }, [])

  const loadDemographyList = () => {
    var rows = []
    for (var key in demography) {
      rows.push(
        <DemographicFilter
          categories={demography[key]}
          callback={() => console.log('')}
          inheritStyle={styles.inheritStyle}
          buttonStyle={styles.buttonStyle}
          listTop={{ marginTop: 25 }}
        />
      )
    }
    return rows
  }

  useEffect(() => {
    if (lazyLoading) return console.log('lazyLoading ...')
    if (!lazyLoading && data) {
      let count = []
      if (timeFilterNumber == 1) count = data.dashboardIndStatsLastWeek.count
      else if (timeFilterNumber == 2) count = data.dashboardIndStatsLast30Days.count
      else if (timeFilterNumber == 3) count = data.dashboardIndStatsLast90Days.count
      else if (timeFilterNumber == 4) count = data.dashboardIndStatsLast6Months.count
      else if (timeFilterNumber == 5) count = data.dashboardIndStatsThisYear.count
      const gd = []
      for (var key in count) {
        key != '__typename' ? gd.push(
          { x: key, y: 25, z: count[key] + ' kgs' }
        ) : null
      }
      setGraphData(gd)
    }
  }, [data, lazyLoading])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingStart: 20, paddingEnd: 20, paddingEnd: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
            }}
            style={[globalStyles.button, { width: 70, paddingVertical: 6, marginTop: 0 }]}>
            <Text style={globalStyles.titleM}>All</Text>
          </TouchableOpacity>
          {
            loadDemographyList()
          }
        </ScrollView>
        <View>
          <TimeFilter
            filter={timeFilter}
            timeFilterCallback={(value) => {
              setTimeFilterNumber(parseInt(value))
              setTimeQuery(timeFilter[parseInt(value) - 1].query)
              updateGraph()
            }}
          />
        </View>
      </View>
      <View style={styles.chart}>
        <VictoryPie
          animate={{ duration: 2000 }}
          cornerRadius={5}
          data={graphData}
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
          innerRadius={65}
          padAngle={2}
        />
      </View>
      <ScrollView style={globalStyles.content}>
        <Text style={styles.title}>Top 10 meat ingridients used</Text>

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
    zIndex: -1
  },
  title: {
    ...globalStyles.titleXL,
    marginVertical: 20,
  },
  ingridient: {
    ...globalStyles.row,
    paddingVertical: 10,
  },
  dropDown: {
    zIndex: 100000,
    alignSelf: 'flex-start',
    borderColor: COLORS.PRIMARY,
    marginStart: 20,
    backgroundColor: 'red'
  },
  inheritStyle: {
    alignSelf: 'baseline',
    marginStart: 10,
  },
  buttonStyle: {
    flexDirection: 'row',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5
  }
})

export default Dashboard
