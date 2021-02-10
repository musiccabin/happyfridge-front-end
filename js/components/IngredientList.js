import React, { useState, createRef } from 'react'
import { View, Text, SectionList, Pressable, StyleSheet } from 'react-native'
// import {
//   MenuContext,
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu'
// import { CheckBox } from 'react-native-elements';
import Dialog, { DialogTitle, DialogFooter, DialogContent, DialogButton } from 'react-native-popup-dialog'
import { globalStyles, COLORS } from '../styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { useQuery } from '@apollo/client'
import { groceriesQuery, leftoversQuery } from '../graphql/queries'

import { useMutation } from '@apollo/client'
import { uncompleteGroceryMutation, completeGroceryMutation, removeGroceryMutation, removeLeftoverMutation } from '../graphql/mutations'

const IngredientList = ({ data, page, titles, iconName, componentName }) => {

  console.log('data is: ', data)

  const navigation = useNavigation()
  // const { dangerouslyGetState } = useNavigation()
  // const { index, routes } = dangerouslyGetState()
  // const screenName = routes[index].name
  const listRef = createRef()

  // const categories = ['Produce', 'Meat', 'Frozen', 'Dairy', 'Nuts & Seeds', 'Other']
  const [activeTab, setActiveTab] = useState(0)
  const [visible, setVisibility] = useState(false)
  const [selected, setSelectedItem] = useState(null)

  const fetchGroceries = useQuery(groceriesQuery, {
    variables: {}
  });

  const fetchLeftovers = useQuery(leftoversQuery, {
    variables: {}
  });

  const [deleteGrocery] = useMutation(removeGroceryMutation)
  const [completeGrocery] = useMutation(completeGroceryMutation)
  const [uncompleteGrocery] = useMutation(uncompleteGroceryMutation)

  const [deleteLeftover] = useMutation(removeLeftoverMutation)

  const handleCategoryScroll = idx => {
    setActiveTab(idx)
    listRef.current?.scrollToLocation({
      itemIndex: 0,
      sectionIndex: idx,
      viewPosition: 0,
    })
  }

  const deleteIt = (id) => {
    const input = {id: id}

    if (page === 'Grocery') {
      deleteGrocery({ variables: { value: input } }).then(({ data }) => {
        if (data.removeGrocery.status) {
          setVisibility(false)
          fetchGroceries.refetch()
          navigation.navigate('GroceryList')
        }
      })
    } else if (page === 'Leftovers') {
      deleteLeftover({ variables: { value: input } }).then(({ data }) => {
        const returnedData = data.removeLeftover
        if (returnedData.status) {
          setVisibility(false)
          fetchLeftovers.refetch()
          if (returnedData.groceryUpdated) fetchGroceries.refetch()
          navigation.navigate('Leftovers')
        }
      })
    }
  }

  const completeOrUncompleteIt = (id) => {
    const input = {id: id}
    if (iconName === 'check') {
      completeGrocery({ variables: { value: input } }).then(({ data }) => {
        if (data.completeGrocery.status) {
          fetchGroceries.refetch()
          navigation.navigate('GroceryList')
        }
      })
    } else {
      uncompleteGrocery({ variables: { value: input } }).then(({ data }) => {
        if (data.uncompleteGrocery.status) {
          fetchGroceries.refetch()
        }
      })
    }
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
          section.data.length != 0 ?
          <Text style={styles.category}>{section.title}</Text>
        : (null))}
        renderItem={({ item }) => (
          // <MenuContext style={styles.container}>
          <View style={styles.list}>
            { page === 'Grocery' ? 
            <MaterialIcons
                style={globalStyles.clock}
                name={iconName}
                size={20}
                color={COLORS.PRIMARY}
                onPress={() => completeOrUncompleteIt(item.id)}
              />  
              : (null) }    
            <Pressable
            onPress={() => {
              navigation.navigate(componentName, { 
                items: item,
                editIngredient: false   
              })
            }}>
              {/* <View > */}
              <Text>{page === 'Grocery' ? item.name : item.ingredient.name}{": "}
                  {item.quantity}{" "}
                  {item.unit}
                </Text>
              {/* </View> */}
            </Pressable>
          {/* <Menu ref={r => (this.menu = r)}>
            <MenuTrigger
              customStyles={{
                triggerTouchable: {
                  onLongPress: () => {
                    // console.log('trigger');
                    this.menu.open();
                  },
                },
              }}> */}
              <MaterialIcons
                style={globalStyles.clock}
                name='delete'
                size={20}
                color={COLORS.SECONDARY}
                onPress={() => {
                  setVisibility(true)
                  setSelectedItem(item.id)
                }}
              />
              <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Really Delete?" />}
                footer={
                  <DialogFooter>
                    {/* <DialogButton
                      text="CANCEL"
                      onPress={() => {}}
                    /> */}
                    <DialogButton
                      text="OK"
                      onPress={() => deleteIt(selected)}
                    />
                  </DialogFooter>}
                onTouchOutside={() => {
                  setVisibility(false)                  
                }}
              >
              </Dialog>
            {/* </MenuTrigger>

            <MenuOptions> */
              /* <MenuOption onSelect={() => alert(`Save`)} text="Save" /> */
              /* <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: COLORS.SECONDARY }}>Delete</Text>
              </MenuOption>
            </MenuOptions>
            </Menu>*/}
        </View> )} 
        // </MenuContext>
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
