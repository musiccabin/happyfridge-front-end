import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, globalStyles } from '../styles'
import { Button, CategoryUnit, Quantity, UsageBar } from '../components'
import { useMutation } from '@apollo/client'
import { groceriesQuery } from '../graphql/queries'
import { newGroceryMutation, updateGroceryMutation } from '../graphql/mutations'

const AddEditGrocery = ({route}) => {

  const navigation = useNavigation()

    const { item, editIngredient } = route.params

    const category = ["Produce", "Dairy", "Meat", "Frozen", "Nuts & Seeds", "Other"]
    // const ingredientArray = ["Apple", "Mango", "Carrot", "Spice", "Orange", "Cajun"]
    const parts = ["   ", "1/4", "1/3", "1/2", "2/3", "3/4"]
    // const units = ["kg", "lb"]

    let wholeInit = 0
    let partInit = parts[0]
    if (!editIngredient) {
      const quantitySplit = item.quantity.split(' ')
      let firstPart = quantitySplit[0]
      if (!firstPart.includes('/')) {
        wholeInit = parseInt(firstPart)
        quantitySplit.shift()
      }
      if (quantitySplit.length > 0) partInit = quantitySplit[0]
    }

    const [categoryTitle, setCategoryTitle] = useState(category[0])
    const [wholeTitle, setWholeTitle] = useState(wholeInit)
    const [partTitle, setPartTitle] = useState(partInit)
    const [unitTitle, setUnitTitle] = useState('   ')
    const [ingredientValue, setIngredientValue] = useState('')
    // const [ingredients, setIngredients] = useState(ingredientArray)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [failedStyling, setFailedStyling] = useState(false)
    const [highlightStyling, setHighlightStyling] = useState(false)

    const [newGrocery] = useMutation(newGroceryMutation, {refetchQueries: [{query: groceriesQuery}]}, { awaitRefetchQueries: true })
    const [updateGrocery] = useMutation(updateGroceryMutation, {refetchQueries: [{query: groceriesQuery}]}, { awaitRefetchQueries: true })

    // const { refetch } = useQuery(groceriesQuery)

    const filteredIngredientArray = value => {
      let tempArray = ingredientArray.filter(item => {
        if (item.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
          return item
      })
      setIngredients(tempArray)
    }

    const styles = StyleSheet.create({
        container: {
            ...globalStyles.content,
            paddingTop: 40,
            paddingHorizontal: 30,
            backgroundColor: COLORS.WHITE,
            ...globalStyles.container
        },
        inputContainer: {
            flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 70
        },
        leftContainer: {
            flexBasis: '20%',
        },
        rightContainer: {
            flexBasis: '40%'
        },
        input: {
            borderBottomColor: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT,
            borderBottomWidth: 1,
            marginVertical: 20,
            paddingBottom: 4,
            paddingHorizontal: 4,
            color: item.name ? COLORS.SECONDARY_FONT : COLORS.PRIMARY_FONT
        },
        ingredientText: {
            // color: highlightStyling ? COLORS.PRIMARY : failedStyling ? COLORS.SECONDARY : COLORS.PRIMARY_FONT
            color: COLORS.PRIMARY,
            fontWeight: '600'
        },
        list: {
            backgroundColor: COLORS.PRIMARY_ICON,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            position: 'absolute',
            right: 0,
            left: 0,
            top: 59,
            zIndex: 100
        },
        listText: {
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        separatorLine: {
            borderBottomColor: COLORS.PRIMARY_FONT,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        button: {
            marginTop: 60,
            width: 145,
            zIndex: -2
        }
    })

    useEffect(() => {
        item.name && setIngredientValue(item.name)
        item.category && setCategoryTitle(item.category)
        item.unit && setUnitTitle(item.unit)
    }, [])

    const createNewGrocery = async () => {
        console.log('it hit me!')
        let quantity = wholeTitle + " " + partTitle
        if (partTitle === parts[0]) quantity = wholeTitle.toString()
        if (wholeTitle == 0) quantity = partTitle
        const data = await newGrocery({
            variables: {
                value: {
                    attributes: {
                        ingredientName: ingredientValue.toLowerCase(),
                        quantity: quantity.toString(),
                        unit: unitTitle,
                        category: categoryTitle.toLowerCase()
                    }
                }
            }
        })
        if (data.data.newGrocery.grocery) {
            Alert.alert(
                "Ingredient Added",
                "",
                [
                    { text: "OK", onPress: () => {
                      // refetch()
                    } }
                ],
                // { cancelable: false }
            )
        } else {
          console.log(data.data.newGrocery.errors.fullMessages)
            Alert.alert(
                data.data.newGrocery.errors.fullMessages[0],
                "",
                [
                    { text: "OK", onPress: () => { } }
                ],
                // { cancelable: false }
            )
        }
    }

    const updateExistingGrocery = async (id) => {
      let quantity = wholeTitle + " " + partTitle
      if (partTitle === parts[0]) quantity = wholeTitle
      if (wholeTitle == 0) quantity = partTitle
      const data = await updateGrocery({
          variables: {
              value: {
                  id: id,
                  attributes: {
                      ingredientName: item.name,
                      quantity: quantity.toString(),
                      unit: unitTitle,
                      category: item.category
                  }
              }
          }
      })

      // console.log(data.data)

      if (data.data.updateGrocery.grocery) {
        Alert.alert(
            "Ingredient Updated",
            "",
            [
                { text: "OK", onPress: () => {
                  // setIngredientValue('')
                  // refetch()
                } }
            ],
            { cancelable: false }
        )
    } else {
        Alert.alert(
            data.data.updateGrocery.errors.fullMessages[0],
            "",
            [
                { text: "OK", onPress: () => { } }
            ],
            { cancelable: false }
        )
    }
  }

    const Separator = () => {
        return <View style={styles.separatorLine}></View>
    }

  const choiceAlert = () => {
    Alert.alert(
      'Not a Singular Form',
      'Is the ingredient in singular form? (e.g. we want "apple" instead of "apples".)',
      [
        {
          text: 'Yes',
          onPress: () => {
            setFailedStyling(true)
            setIngredientValue(ingredientValue.slice(0, -1))
          },
          style: 'cancel',
        },
        {
          text: 'No',
          onPress: () => {
            //TODO!: ADD TO LIST
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
        setIsUserTyping(false)
        setHighlightStyling(false)
        setFailedStyling(false)
      }}
    >
    <View style={styles.container}>
      <UsageBar
        name={editIngredient ? ingredientValue : item.name}
        quantity={(wholeTitle == 0 ? '' : wholeTitle) + (partTitle.includes('/') ? " " + partTitle : "")}
        unit={unitTitle}
      />
      <View>
      {/* <View style={styles.inputContainer}> */}
        {/* <View style={styles.leftContainer}> */}
          <View>
            {editIngredient && <Text style={styles.ingredientText}>Ingredient</Text>}
            {editIngredient && <TextInput
              style={styles.input}
              // editable={editIngredient}
              onChangeText={value => {
                setIngredientValue(value)
                setIsUserTyping(true)
                setHighlightStyling(true)
                value.length == 0 && setIsUserTyping(false)
                  // : filteredIngredientArray(value)
              }}
              value={ingredientValue}
              maxLength={50}
            />}
            {isUserTyping && (
              <FlatList
                style={styles.list}
                // data={ingredients}
                ItemSeparatorComponent={Separator}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={() => {
                      setIngredientValue(item)
                      setIsUserTyping(false)
                      setHighlightStyling(false)
                    }}
                    activeOpacity={0.1}
                    underlayColor={COLORS.SECONDARY}
                  >
                    <Text style={styles.listText}>{item}</Text>
                  </TouchableHighlight>
                )}
              />
            )}
            <Quantity
              style={{ alignItems: 'flex-start' }}
              whole={wholeTitle}
              part={partTitle}
              wholeCallback={value => setWholeTitle(value)}
              partCallback={value => setPartTitle(value)}
              parts={parts}
            />
          </View>
          <View>
          {/* <View style={styles.rightContainer}> */}
            <CategoryUnit
                ingredient={ingredientValue}
                categories={category}
                // units={units}
                categoryCallback={(value) => setCategoryTitle(value)}
                unitCallback={(value) => setUnitTitle(value)}
                callbackIngredientHighlight={() => setHighlightStyling(false)}
                ingredientCategory={item.category || categoryTitle}
                defaultUnitSelection={unitTitle}
            />
            <Button
                children={"Save"}
                style={styles.button}
                onPress={() => {
                    setHighlightStyling(false)
                    setFailedStyling(false)
                    if (ingredientValue.slice(-1) == 's' || ingredientValue.slice(-2) == 'es') choiceAlert()
                    else editIngredient ? createNewGrocery() : updateExistingGrocery(item.id)
                    navigation.goBack()
                }} />
        </View>
      </View>
    {/* return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            setIsUserTyping(false)
            setHighlightStyling(false)
            setFailedStyling(false)
        }}>
            <View style={styles.container}>
                <UsageBar
                    categoryTitle={categoryTitle}
                    wholeTitle={wholeTitle}
                    partTitle={partTitle}
                    unitTitle={unitTitle}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.ingredientText}>Ingredient</Text>
                        <TextInput
                            style={styles.input}
                            editable={editIngredient}
                            onChangeText={value => {
                                setIngredientValue(value)
                                setIsUserTyping(true)
                                setHighlightStyling(true)
                                value.length == 0 ? setIsUserTyping(false) : filteredIngredientArray(value)
                            }}
                            value={ingredientValue}
                            maxLength={50}
                        />
                        {isUserTyping && (<FlatList
                            style={styles.list}
                            data={ingredients}
                            ItemSeparatorComponent={Separator}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={
                                ({ item }) =>
                                    <TouchableHighlight
                                        onPress={() => {
                                            setIngredientValue(item)
                                            setIsUserTyping(false)
                                            setHighlightStyling(false)
                                        }}
                                        activeOpacity={0.1}
                                        underlayColor={COLORS.SECONDARY}
                                    >
                                        <Text style={styles.listText}>{item}</Text>
                                    </TouchableHighlight>
                            }
                        />)}
                        <View style={{ marginTop: 30 }}>
                            <Quantity
                                wholeCallback={(value) => setWholeTitle(value)}
                                partCallback={(value) => setPartTitle(value)}
                                parts={parts}
                            />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <CategoryUnit
                            categories={category}
                            units={units}
                            categoryCallback={(value) => setCategoryTitle(value)}
                            unitCallback={(value) => setUnitTitle(value)}
                            callbackIngredientHighlight={() => setHighlightStyling(false)}
                            defaultCategorySelection={items.category}
                            defaultUnitSelection={items.unit}
                        />
                        <Button
                            children={"Save"}
                            style={styles.button}
                            onPress={() => {
                                setHighlightStyling(false)
                                setFailedStyling(false)
                                if (ingredientValue.slice(-1) == 's' || ingredientValue.slice(-2) == 'es') choiceAlert()
                                else createNewGrocery()
                            }} />
                    </View>
                </View> */}
          </View>
    </TouchableWithoutFeedback>
  )
}

export default AddEditGrocery
