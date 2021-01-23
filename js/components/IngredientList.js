import React, { useState, createRef } from 'react'
import { View, Text, SectionList, Pressable, StyleSheet } from 'react-native'
import { globalStyles, COLORS } from '../styles'
import { useNavigation } from '@react-navigation/native'

const IngredientList = ({ data, titles }) => {
  const navigation = useNavigation()
  const listRef = createRef()

  // const categories = ['Produce', 'Meat', 'Frozen', 'Dairy', 'Nuts & Seeds', 'Other']
  const [activeTab, setActiveTab] = useState(0)

  const handleCategoryScroll = idx => {
    setActiveTab(idx)
    listRef.current?.scrollToLocation({
      itemIndex: 0,
      sectionIndex: idx,
      viewPosition: 0,
    })
  }

  return (
    <>
      <View style={styles.header}>
        {titles.map((title, idx) => (
          <Pressable key={idx} onPress={() =>
            handleCategoryScroll(idx)
          }>
            <View
              style={
                activeTab === idx
                  ? styles.headerActiveCategoryWrapper
                  : undefined
              }
            >
              <Text
                style={
                  activeTab === idx
                    ? styles.headerActiveCategory
                    : globalStyles.titleM
                }
              >
                {title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <SectionList
        ref={listRef}
        sections={data}
        style={styles.listWrapper}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Your list is empty.</Text>
        )}
        renderSectionHeader={({ section }) => (
          section.data.length ?
          <Text style={styles.category}>{section.title}</Text>
        : (null))}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('AddEditGrocery')}>
            <View style={styles.list}>
              <Text>{item.name}</Text>
              <Text>
                {item.quantity}{" "}
                {item.unit}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.content,
    ...globalStyles.row,
    borderTopWidth: 1,
    borderTopColor: COLORS.SEPARATOR,
    backgroundColor: COLORS.WHITE,
  },
  category: {
    ...globalStyles.titleM,
    ...globalStyles.content,
    backgroundColor: COLORS.BACKGROUND,
    paddingVertical: 5,
  },
  listWrapper: {
    backgroundColor: COLORS.WHITE,
  },
  list: {
    ...globalStyles.content,
    ...globalStyles.row,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 25,
  },
  headerActiveCategoryWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PRIMARY,
  },
  headerActiveCategory: {
    color: COLORS.PRIMARY,
    marginVertical: 10,
    fontSize: 16,
  },
  emptyListText: {
    ...globalStyles.titleXL,
    textAlign: 'center',
    marginVertical: 50,
  },
})

export default IngredientList
