import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TouchableOpacity, FlatList, SnapshotViewIOSComponent } from 'react-native'
import { VictoryPie, Slice } from 'victory-native'
import ToggleSwitch from 'toggle-switch-react-native'
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

  const secondHalfOfYear = new Date().getMonth() > 5
  const [scroll, setScroll] = useState(false)
  // const [refresh, setRefresh] = useState()
  // const refreshPage = (refresh) => setRefresh(!refresh)

  // const { data, error, loading } = useQuery(favRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })

  const allProvs = useQuery(allProvsQuery)

  const { currentUserContext } = useContext(Context)
  const [currentUser, setCurrentUser] = currentUserContext

  const [timeFilterNumber, setTimeFilterNumber] = useState(1)
  const resetTimeFilter = () => setTimeFilterNumber(1)
  // console.log('filter number is: ', timeFilterNumber)

  const [selectedButton, setSelectedButton] = useState(1)
  const resetButton = () => setSelectedButton(1)
  const setSelectedFromTimeFilter = (id) => setSelectedButton(id)

  const [graphData, setGraphData] = useState([])

  const [timeQuery, setTimeQuery] = useState(dashboardIndStatsLastWeekQuery)
  const setTimeQueryFromDem = () => setTimeQuery(timeFilter[0].query)

  const [showAll, setShowAll] = useState(false)
  
  const [query1, setQuery1] = useState(dashboardIndStatsLastWeekQuery)
  const [query2, setQuery2] = useState(dashboardIndStatsLast30DaysQuery)
  const [query3, setQuery3] = useState(dashboardIndStatsLast90DaysQuery)
  const [query4, setQuery4] = useState(dashboardIndStatsLast6MonthsQuery)
  const [query5, setQuery5] = useState(dashboardIndStatsThisYearQuery)
  const [query6, setQuery6] = useState(dashboardIndStatsAllHistoryQuery)

  const resetQueries = () => {
    if (showAll) {
      if (selectedCity === 'All Cities') {
        setQuery1(dashboardComStatsLastWeekByProvinceQuery)
        setQuery2(dashboardComStatsLast30DaysByProvinceQuery)
        setQuery3(dashboardComStatsLast90DaysByProvinceQuery)
        setQuery4 (dashboardComStatsLast6MonthsByProvinceQuery)
        setQuery5(dashboardComStatsThisYearByProvinceQuery)
        setQuery6(dashboardComStatsAllHistoryByProvinceQuery)
      } else if (selectedCity) {
        setQuery1(dashboardComStatsLastWeekByCityQuery)
        setQuery2(dashboardComStatsLast30DaysByCityQuery)
        setQuery3(dashboardComStatsLast90DaysByCityQuery)
        setQuery4 (dashboardComStatsLast6MonthsByCityQuery)
        setQuery5(dashboardComStatsThisYearByCityQuery)
        setQuery6(dashboardComStatsAllHistoryByCityQuery)
      }
    } else {
      setQuery1(dashboardIndStatsLastWeekQuery)
      setQuery2(dashboardIndStatsLast30DaysQuery)
      setQuery3(dashboardIndStatsLast90DaysQuery)
      setQuery4(dashboardIndStatsLast6MonthsQuery)
      setQuery5(dashboardIndStatsThisYearQuery)
      setQuery6(dashboardIndStatsAllHistoryQuery)
    }
  }

  const indQueries = [
    dashboardIndStatsLastWeekQuery,
    dashboardIndStatsLast30DaysQuery,
    dashboardIndStatsLast90DaysQuery,
    dashboardIndStatsLast6MonthsQuery,
    dashboardIndStatsThisYearQuery,
    dashboardIndStatsAllHistoryQuery]

  // const cityQueries = [
  //   dashboardComStatsLastWeekByCityQuery,
  //   dashboardComStatsLast30DaysByCityQuery,
  //   dashboardComStatsLast90DaysByCityQuery,
  //   dashboardComStatsLast6MonthsByCityQuery,
  //   dashboardComStatsThisYearByCityQuery,
  //   dashboardComStatsAllHistoryByCityQuery]
    
  const isInd = indQueries.includes(timeQuery)
  // const isCity = cityQueries.includes(timeQuery)
  if (showAll & isInd) {
    setTimeQuery(dashboardComStatsLastWeekByCityQuery)
    resetQueries()
  }
  if (!showAll && !isInd) {
    setTimeQuery(dashboardIndStatsLastWeekQuery)
    resetQueries()
  }

  const timeFilter = [
    {
      id: "1",
      title: "7 days",
      query: query1
    },
    {
      id: "2",
      title: "30 days",
      query: query2
    },
    {
      id: "3",
      title: "3 months",
      query: query3
    },
    {
      id: "4",
      title: "6 months",
      query: query4
    },
  ]

  if (secondHalfOfYear) {
    timeFilter.push({
        id: "5",
        title: "This year",
        query: query5
    })
  } else {
    timeFilter.push({
        id: "5",
        title: "All history",
        query: query6
      })
  }

  const lastWeekProv = useQuery(dashboardComStatsLastWeekByProvinceQuery)
  const last30DaysProv = useQuery(dashboardComStatsLast30DaysByProvinceQuery)
  const last90DaysProv = useQuery(dashboardComStatsLast90DaysByProvinceQuery)
  const last6MonthsProv = useQuery(dashboardComStatsLast6MonthsByProvinceQuery)
  const thisYearProv = useQuery(dashboardComStatsThisYearByProvinceQuery)
  const allHistoryProv = useQuery(dashboardComStatsAllHistoryByProvinceQuery)

  const lastWeekCity = useQuery(dashboardComStatsLastWeekByCityQuery)
  const last30DaysCity = useQuery(dashboardComStatsLast30DaysByCityQuery)
  const last90DaysCity = useQuery(dashboardComStatsLast90DaysByCityQuery)
  const last6MonthsCity = useQuery(dashboardComStatsLast6MonthsByCityQuery)
  const thisYearCity = useQuery(dashboardComStatsThisYearByCityQuery)
  const allHistoryCity = useQuery(dashboardComStatsAllHistoryByCityQuery)

  const loading = lastWeekCity.loading || last30DaysCity.loading || last90DaysCity.loading || last6MonthsCity.loading || thisYearCity.loading ||
  allHistoryCity.loading || lastWeekProv.loading || last30DaysProv.loading || last90DaysProv.loading || last6MonthsProv.loading || thisYearProv.loading ||
  allHistoryProv.loading

  const [updateGraphLastWeek] = useLazyQuery(query1)
  const [updateGraphLast30Days] = useLazyQuery(query2)
  const [updateGraphLast90Days] = useLazyQuery(query3)
  const [updateGraphLast6Months] = useLazyQuery(query4)
  const [updateGraphThisYear] = useLazyQuery(query5)
  const [updateGraphAllHistory] = useLazyQuery(query6)

  const [updateProvGraphLastWeek] = useLazyQuery(dashboardComStatsLastWeekByProvinceQuery)
  const [updateProvGraphLast30Days] = useLazyQuery(dashboardComStatsLast30DaysByProvinceQuery)
  const [updateProvGraphLast90Days] = useLazyQuery(dashboardComStatsLast90DaysByProvinceQuery)
  const [updateProvGraphLast6Months] = useLazyQuery(dashboardComStatsLast6MonthsByProvinceQuery)
  const [updateProvGraphThisYear] = useLazyQuery(dashboardComStatsThisYearByProvinceQuery)
  const [updateProvGraphAllHistory] = useLazyQuery(dashboardComStatsAllHistoryByProvinceQuery)

  const [updateGraph, { lazyLoading, data }] = useLazyQuery(timeQuery)
  // const refreshPage = () => updateGraph()

  const [cities, setCities] = useState()
  const updateCities = (cities) => {
    setCities(cities)
  }

  const [selectedCity, setSelectedCity] = useState(currentUser.city)
  const keepSelectedCity = (newCity) => {
    setSelectedCity(newCity)
    resetQueries()
  }
  const [selectedProv, setSelectedProv] = useState(currentUser.province)
  const keepSelectedProv = (newProv) => {
    setSelectedProv(newProv)
    resetQueries()
  }

  const [selectedCat, setSelectedCat] = useState()
  const [usages, setUsages] = useState([])

  useEffect(() => {
    if (timeQuery !== query1) updateGraphLastWeek()
    if (timeQuery !== query2) updateGraphLast30Days()
    if (timeQuery !== query3) updateGraphLast90Days()
    if (timeQuery !== query4) updateGraphLast6Months()
    if (secondHalfOfYear && timeQuery !== query5) updateGraphThisYear()
    if (timeQuery !== query6)  updateGraphAllHistory()
    if (showAll) {
      updateProvGraphLastWeek()
      updateProvGraphLast30Days()
      updateProvGraphLast90Days()
      updateProvGraphLast6Months()
      if (secondHalfOfYear) updateProvGraphThisYear()
      updateProvGraphAllHistory()
    }
    updateGraph()
  }, [])

  useEffect(() => {
    if (lazyLoading) return console.log('lazyLoading ...')
    if (!lazyLoading && data) updateCounts()
  }, [data, lazyLoading])

  const loadDemographyList = (provs) => {
    const data = {}
    for (let provData of provs) {
      data[provData.prov] = provData.cities
    }

    if (!cities) setCities(data[selectedProv])

    const rows = [
      <DemographicFilter
      // categories={'province'}
      inheritStyle={styles.inheritStyle}
      buttonStyle={styles.buttonStyle}
      listTop={{ marginTop: 25 }}
      data={Object.keys(data)}
      provAndCities={data}
      provField={true}
      updateCities={updateCities}
      initVal={selectedProv}
      resetQueries={resetQueries}
      keepSelectedProv={keepSelectedProv}
      resetTimeFilter={resetTimeFilter}
      updateGraph={updateGraph}
      resetButton={resetButton}
      setTimeQueryFromDem={setTimeQueryFromDem}
      setSelectedCat={setSelectedCat}
      updateCounts={updateCounts}
    />,
    <DemographicFilter
      // categories={'city'}
      inheritStyle={styles.inheritStyle}
      buttonStyle={styles.buttonStyle}
      listTop={{ marginTop: 25 }}
      data={cities}
      initVal={selectedCity}
      resetQueries={resetQueries}
      keepSelectedCity={keepSelectedCity}
      resetTimeFilter={resetTimeFilter}
      updateGraph={updateGraph}
      resetButton={resetButton}
      setTimeQueryFromDem={setTimeQueryFromDem}
      setSelectedCat={setSelectedCat}
      updateCounts={updateCounts}
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

  const showTop10Ingredients = (category) => {
    if (category === 'nuts &\n seeds') category = 'nuts / seeds'
      // console.log('cat clicked on is: ', category)
      if (category !== selectedCat) setSelectedCat(category)
      let usagesCurTimeFrame
      const city = selectedCity?.toLowerCase()
      const prov = selectedProv?.toLowerCase()
      if (showAll) {
        if (selectedCity === 'All Cities') {
        if (timeFilterNumber == 1) usagesCurTimeFrame = lastWeekProv.data.dashboardComStatsLastWeekByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
        else if (timeFilterNumber == 2) usagesCurTimeFrame = last30DaysProv.data.dashboardComStatsLast30DaysByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
        else if (timeFilterNumber == 3) usagesCurTimeFrame = last90DaysProv.data.dashboardComStatsLast90DaysByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
        else if (timeFilterNumber == 4) usagesCurTimeFrame = last6MonthsProv.data.dashboardComStatsLast6MonthsByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
        else if (secondHalfOfYear && timeFilterNumber == 5) usagesCurTimeFrame = thisYearProv.data.dashboardComStatsThisYearByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
        else usagesCurTimeFrame = allHistoryProv.data.dashboardComStatsAllHistoryByProvince?.find(stat => stat.province === prov)?.geoUsage?.usages
      } else if (selectedCity) {
        if (timeFilterNumber == 1) usagesCurTimeFrame = lastWeekCity.data.dashboardComStatsLastWeekByCity?.find(stat => stat.city === city)?.geoUsage?.usages
        else if (timeFilterNumber == 2) usagesCurTimeFrame = last30DaysCity.data.dashboardComStatsLast30DaysByCity?.find(stat => stat.city === city)?.geoUsage?.usages
        else if (timeFilterNumber == 3) usagesCurTimeFrame = last90DaysCity.data.dashboardComStatsLast90DaysByCity?.find(stat => stat.city === city)?.geoUsage?.usages
        else if (timeFilterNumber == 4) usagesCurTimeFrame = last6MonthsCity.data.dashboardComStatsLast6MonthsByCity?.find(stat => stat.city === city)?.geoUsage?.usages
        else if (secondHalfOfYear && timeFilterNumber == 5) usagesCurTimeFrame = thisYearCity.data.dashboardComStatsThisYearByCity?.find(stat => stat.city === city)?.geoUsage?.usages
        else usagesCurTimeFrame = allHistoryCity.data.dashboardComStatsAllHistoryByCity?.find(stat => stat.city === city)?.geoUsage?.usages
      }
    } else {
      if (timeFilterNumber == 1) usagesCurTimeFrame = data.dashboardIndStatsLastWeek.usages
      else if (timeFilterNumber == 2) usagesCurTimeFrame = data.dashboardIndStatsLast30Days.usages
      else if (timeFilterNumber == 3) usagesCurTimeFrame = data.dashboardIndStatsLast90Days.usages
      else if (timeFilterNumber == 4) usagesCurTimeFrame = data.dashboardIndStatsLast6Months.usages
      else if (secondHalfOfYear && timeFilterNumber == 5) usagesCurTimeFrame = data.dashboardIndStatsThisYear.usages
      else usagesCurTimeFrame = data.dashboardIndStatsAllHistory.usages
    }
    if (!usagesCurTimeFrame) {
      if (usages) setUsages(null)
    } else {
      if (category === 'nuts / seeds') {
        if (usages !== usagesCurTimeFrame['nutsAndSeeds']) setUsages(usagesCurTimeFrame['nutsAndSeeds'])
      } else {
        if (usages !== usagesCurTimeFrame[category]) setUsages(usagesCurTimeFrame[category])
      }
    }
    return usages
  }

  const updateCounts = () => {
    let count = []
    const city = selectedCity?.toLowerCase()
    const prov = selectedProv?.toLowerCase()
    if (showAll) {
      if (selectedCity == 'All Cities') {
        if (timeFilterNumber == 1) count = lastWeekProv.data.dashboardComStatsLastWeekByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
        else if (timeFilterNumber == 2) count = last30DaysProv.data.dashboardComStatsLast30DaysByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
        else if (timeFilterNumber == 3) count = last90DaysProv.data.dashboardComStatsLast90DaysByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
        else if (timeFilterNumber == 4) count = last6MonthsProv.data.dashboardComStatsLast6MonthsByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
        else if (secondHalfOfYear && timeFilterNumber == 5) count = thisYearProv.data.dashboardComStatsThisYearByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
        else count = allHistoryProv.data.dashboardComStatsAllHistoryByProvince?.find(stat => stat.province === prov)?.geoUsage?.count
      } else if (selectedCity) {
        if (timeFilterNumber == 1) count = lastWeekCity.data.dashboardComStatsLastWeekByCity?.find(stat => stat.city === city)?.geoUsage?.count
        else if (timeFilterNumber == 2) count = last30DaysCity.data.dashboardComStatsLast30DaysByCity?.find(stat => stat.city === city)?.geoUsage?.count
        else if (timeFilterNumber == 3) count = last90DaysCity.data.dashboardComStatsLast90DaysByCity?.find(stat => stat.city === city)?.geoUsage?.count
        else if (timeFilterNumber == 4) count = last6MonthsCity.data.dashboardComStatsLast6MonthsByCity?.find(stat => stat.city === city)?.geoUsage?.count
        else if (secondHalfOfYear && timeFilterNumber == 5) count = thisYearCity.data.dashboardComStatsThisYearByCity?.find(stat => stat.city === city)?.geoUsage?.count
        else count = allHistoryCity.data.dashboardComStatsAllHistoryByCity?.find(stat => stat.city === city)?.geoUsage?.count
      }
    } else {
      if (timeFilterNumber == 1) count = data.dashboardIndStatsLastWeek.count
      else if (timeFilterNumber == 2) count = data.dashboardIndStatsLast30Days.count
      else if (timeFilterNumber == 3) count = data.dashboardIndStatsLast90Days.count
      else if (timeFilterNumber == 4) count = data.dashboardIndStatsLast6Months.count
      else if (secondHalfOfYear && timeFilterNumber == 5) count = data.dashboardIndStatsThisYear.count
      else count = data.dashboardIndStatsAllHistory.count
    }
    const gd = []
    if (!count) count = {
      produce: 0,
      dairy: 0,
      meat: 0,
      frozen: 0,
      nutsAndSeeds: 0,
      other: 0
    }
    for (let key in count) {
      let category = key
      if (key === 'nutsAndSeeds') category = 'nuts &\n seeds'
      key != '__typename' ? gd.push(
        { x: category, y: 25, z: count[key] + '' }
      ) : null
    }
    setGraphData(gd)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingStart: 20, paddingEnd: 20, paddingEnd: 10 }}
        >
          <ToggleSwitch
            isOn={showAll}
            onColor={COLORS.PRIMARY}
            offColor={COLORS.BACKGROUND}
            label="All Users"
            labelStyle={globalStyles.titleM}
            // labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={(isOn) => {
              setShowAll(isOn)
              setSelectedCat(null)
              setSelectedButton(1)
              setTimeFilterNumber(1)
              setTimeQuery(timeFilter[0].query)
              resetQueries()
              updateGraph()
              setUsages(null)
              setScroll(true)
            }}
          />
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          {
            showAll ? loadDemographyList(allProvs.data.allProvs) : null
          }
        </ScrollView>
        <View>
          <TimeFilter
            curVal={timeFilterNumber}
            selectedButton={selectedButton}
            setSelectedFromTimeFilter={setSelectedFromTimeFilter}
            filter={timeFilter}
            timeFilterCallback={(value) => {
              setTimeFilterNumber(parseInt(value))
              setTimeQuery(timeFilter[parseInt(value) - 1].query)
              resetQueries()
              updateGraph()
              // showTop10Ingredients(selectedCat)
            }}
            shouldScroll={scroll}
            setScroll={setScroll}
          />
        </View>
      </View>
      {loading? <Text style={{...globalStyles.titleXL, textAlign: 'center', marginVertical: 125,}}>Loading...</Text> :
      <View style={styles.chart}>
        {selectedCity && <VictoryPie
          // animate={{ duration: 2000 }}
          cornerRadius={5}
          data={graphData}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [{
                    target: "labels",
                    mutation: (props) => showTop10Ingredients(props.datum.x, data)
                  }]
                }
              }
            }
          ]}
        //   dataComponent={
        //   <Slice events={{ onPressIn: (e) => {
        //     showTop10Ingredients(e.currentTarget)
        //   } }}/>
        // }
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
        />}
      </View>}
      <ScrollView style={globalStyles.content}>
        {(!showAll || (showAll && selectedCity)) && <Text style={styles.title}>{selectedCat ? `Top ${selectedCat} ingredients:` : 'Tap on a slice...'}</Text>}
        {selectedCat ?
        showTop10Ingredients(selectedCat)?.map(usage => 
        <View style={styles.ingredient}>
          <Text style={globalStyles.titleL}>{usage.ingredient.name} {'(x'}{usage.count}{')'}</Text>
          <Text style={globalStyles.titleL}>{usage.quantity} {usage.unit}</Text>
        </View>) : null}
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
  ingredient: {
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
    marginTop: 10,
  }
})

export default Dashboard
