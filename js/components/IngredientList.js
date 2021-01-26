import React, { useState, createRef } from 'react'
import { View, Text, SectionList, Pressable, StyleSheet } from 'react-native'
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import Dialog, { DialogTitle, DialogFooter, DialogContent, DialogButton } from 'react-native-popup-dialog'
import { globalStyles, COLORS } from '../styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const IngredientList = ({ data, titles }) => {
  const navigation = useNavigation()
  const listRef = createRef()

  // const categories = ['Produce', 'Meat', 'Frozen', 'Dairy', 'Nuts & Seeds', 'Other']
  const [activeTab, setActiveTab] = useState(0)
  const [visible, setVisibility] = useState(false)

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
          // <MenuContext style={styles.container}>
          <View style={styles.list}>            
            <Pressable
            onPress={() => navigation.navigate('AddEditGrocery')}>
              {/* <View > */}
              <Text>{item.name}{": "}
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
                onPress={() => setVisibility(true)}
              />
              <Dialog
                visible={visible}
                dialogTitle={<DialogTitle title="Really Delete?" />}
                footer={
                  <DialogFooter>
                    <DialogButton
                      text="CANCEL"
                      onPress={() => {}}
                    />
                    <DialogButton
                      text="OK"
                      onPress={() => {}}
                    />
                  </DialogFooter>}
                onTouchOutside={() => {
                  setVisibility(false)                  
                }}
              >
              {/* <DialogContent><Text>Really Delete?</Text></DialogContent> */}
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
