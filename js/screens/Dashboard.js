import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import { VictoryPie } from 'victory-native'
import { COLORS, globalStyles } from '../styles'
import { TimeFilter, DemographicFilter } from '../components'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  allProvsQuery,
  dashboardIndStatsLastWeekQuery,
  dashboardIndStatsLast30DaysQuery,
  dashboardIndStatsLast6MonthsQuery,
  dashboardIndStatsLast90DaysQuery,
  dashboardIndStatsThisYearQuery,
  dashboardIndStatsAllHistoryQuery,
  dashboardComStatsLastWeekByCityQuery,
  dashboardComStatsLastWeekByRegionQuery,
  dashboardComStatsLastWeekByProvinceQuery,
  dashboardComStatsLast30DaysByCityQuery,
  dashboardComStatsLast30DaysByRegionQuery,
  dashboardComStatsLast30DaysByProvinceQuery,
  dashboardComStatsLast90DaysByCityQuery,
  dashboardComStatsLast90DaysByRegionQuery,
  dashboardComStatsLast90DaysByProvinceQuery,
  dashboardComStatsLast6MonthsByCityQuery,
  dashboardComStatsLast6MonthsByRegionQuery,
  dashboardComStatsLast6MonthsByProvinceQuery,
  dashboardComStatsThisYearByCityQuery,
  dashboardComStatsThisYearByRegionQuery,
  dashboardComStatsThisYearByProvinceQuery,
  dashboardComStatsAllHistoryByCityQuery,
  dashboardComStatsAllHistoryByRegionQuery,
  dashboardComStatsAllHistoryByProvinceQuery
} from '../graphql/queries'
import { Context } from '../context'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

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

  // const { data, error, loading } = useQuery(favRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })



  // const allLocations = {
  //   province: ["BC", "AB"],
  //   city: ["Vancouver", "Langley", "Surrey"],
  //   region: ["Fraser Valley", "Delta Creek", "South Surrey"]
  // }

  // const mock = { bc: ['vancouver'], ab: ['calgary'] }

  const allProvs = useQuery(allProvsQuery)

  const { currentUserContext } = useContext(Context)
  const [currentUser, setCurrentUser] = currentUserContext

  const [timeFilterNumber, setTimeFilterNumber] = useState(1)
  const [graphData, setGraphData] = useState([])
  const [timeQuery, setTimeQuery] = useState(dashboardIndStatsLastWeekQuery)

  const [updateGraph, { lazyLoading, data }] = useLazyQuery(timeQuery)
  const allHistoryComCity = useQuery(dashboardComStatsAllHistoryByCityQuery)

  const [meOrAll, setMeOrAll] = useState('Only Me')

  const [cities, setCities] = useState()
  const updateCities = (cities) => {
    setCities(cities)
  }

  const [selectedCity, setSelectedCity] = useState(currentUser.city)
  const keepSelectedCity = (newCity) => {
    setSelectedCity(newCity)
  }
  const [selectedProv, setSelectedProv] = useState(currentUser.province)
  const keepSelectedProv = (newProv) => {
    setSelectedProv(newProv)
  }

  useEffect(() => {
    updateGraph()
    //TODO! using useLazyQuery on first load is causing glitch, may use useQuery for first time load 
  }, [])

  const loadDemographyList = (provs) => {
    const data = {}
    for (let provData of provs) {
      data[provData.prov] = provData.cities
    }

    const rows = [
      <DemographicFilter
      // categories={'province'}
      callback={() => console.log('')}
      inheritStyle={styles.inheritStyle}
      buttonStyle={styles.buttonStyle}
      listTop={{ marginTop: 25 }}
      data={Object.keys(data)}
      provAndCities={data}
      provField={true}
      updateCities={updateCities}
      initVal={selectedProv}
      keepSelectedProv={keepSelectedProv}
    />,
    <DemographicFilter
      // categories={'city'}
      callback={() => console.log('')}
      inheritStyle={styles.inheritStyle}
      buttonStyle={styles.buttonStyle}
      listTop={{ marginTop: 25 }}
      data={cities}
      initVal={selectedCity}
      keepSelectedCity={keepSelectedCity}
        />
    ]
    // for (let key in allLocations) {
      // rows.push(
      //   <DemographicFilter
      //     categories={allLocations[key]}
      //     callback={() => console.log('')}
      //     inheritStyle={styles.inheritStyle}
      //     buttonStyle={styles.buttonStyle}
      //     listTop={{ marginTop: 25 }}
      //     data={mockCity}
        // />
      // )
    // }
    return rows
  }

  useEffect(() => {
    const curMonth = new Date().getMonth()
    if (lazyLoading) return console.log('lazyLoading ...')
    if (!lazyLoading && data) {
      let count = []
      if (timeFilterNumber == 1) count = data.dashboardIndStatsLastWeek.count
      else if (timeFilterNumber == 2) count = data.dashboardIndStatsLast30Days.count
      else if (timeFilterNumber == 3) count = data.dashboardIndStatsLast90Days.count
      else if (timeFilterNumber == 4) count = data.dashboardIndStatsLast6Months.count
      else if (timeFilterNumber == 5 && curMonth > 5) count = data.dashboardIndStatsThisYear.count
      else count = data.dashboardIndStatsAllHistory.count
      const gd = []
      for (let key in count) {
        key != '__typename' ? gd.push(
          { x: key, y: 25, z: count[key] + '' }
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
              if (meOrAll === 'Only Me') {
                setMeOrAll('All')
                if (!cities) setCities(allProvs.data.allProvs.find(provData => provData.prov === currentUser.province).cities)
              } else {
                setMeOrAll('Only Me')
              }
            }}
            style={[globalStyles.button, { width: 70, paddingVertical: 6, marginTop: 0 }]}>
            <Text style={globalStyles.titleM}>{meOrAll}</Text>
          </TouchableOpacity>
          {
            meOrAll === 'All' ? loadDemographyList(allProvs.data.allProvs) : null
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
        <Text style={styles.title}>Top 10 meat ingredients used</Text>

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
    position: 'absolute',
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
    marginBottom: 5,
  }
})

export default Dashboard
