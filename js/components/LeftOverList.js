import React, { useState, createRef } from 'react'
import { View, Text, SectionList, Pressable, StyleSheet } from 'react-native'
import { globalStyles, COLORS } from '../styles'

const LeftOverList = ({ data }) => {
  const listRef = createRef()

  const categories = ['Produce', 'Meat', 'Frozen', 'Dairy', 'Nuts & Seeds']
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
        {categories.map((category, idx) => (
          <Pressable key={idx} onPress={() => handleCategoryScroll(idx)}>
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
                {category}
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
          <Text style={styles.emptyListText}>No leftovers.</Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.category}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text>{item.name}</Text>
            <Text>
              {item.quantity}
              {item.unit}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.content,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default LeftOverList
