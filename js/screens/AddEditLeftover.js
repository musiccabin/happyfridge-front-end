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
import { useMutation, useQuery } from '@apollo/client'
import { leftoversQuery, groceriesQuery } from '../graphql/queries'
import { newLeftoverMutation, updateLeftoverMutation } from '../graphql/mutations'

const AddEditLeftover = ({route}) => {

  const navigation = useNavigation()

    const { item, editIngredient } = route.params
    const ingredientName = item?.ingredient?.name
    const ingredientCat = item?.ingredient?.category

    const category = ["Produce", "Dairy", "Meat", "Frozen", "Nuts & Seeds", "Other"]
    // const ingredientArray = ["Apple", "Mango", "Carrot", "Spice", "Orange", "Cajun"]
    const parts = ["", "1/4", "1/3", "1/2", "2/3", "3/4"]
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
    const [unitTitle, setUnitTitle] = useState('')
    const [ingredientValue, setIngredientValue] = useState('')
    // const [ingredients, setIngredients] = useState(ingredientArray)
    const [isUserTyping, setIsUserTyping] = useState(false)
    const [failedStyling, setFailedStyling] = useState(false)
    const [highlightStyling, setHighlightStyling] = useState(false)

    const [newLeftover] = useMutation(newLeftoverMutation, {refetchQueries: [{query: leftoversQuery}]}, { awaitRefetchQueries: true })
    const [updateLeftover] = useMutation(updateLeftoverMutation, {refetchQueries: [{query: leftoversQuery}]}, { awaitRefetchQueries: true })

    const { refetch } = useQuery(groceriesQuery)

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
            justifyContent: 'space-between',
            marginTop: 70
        },
        leftContainer: {
            flexBasis: '55%',
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
            color: ingredientName ? COLORS.SECONDARY_FONT : COLORS.PRIMARY_FONT
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
        ingredientName && setIngredientValue(ingredientName)
        ingredientCat && setCategoryTitle(ingredientCat)
        item.unit && setUnitTitle(item.unit)
    }, [])

    const createNewLeftover = async () => {
        console.log('it hit me!')
        let quantity = wholeTitle + " " + partTitle
        if (partTitle === parts[0]) quantity = wholeTitle.toString()
        if (wholeTitle == 0) quantity = partTitle
        const data = await newLeftover({
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
        const dataReturned = data?.data?.newLeftover
        if (dataReturned?.groceryUpdated) refetch()
        if (dataReturned?.leftover) {
            Alert.alert(
                "Ingredient Added",
                "",
                [
                    { text: "OK", onPress: () => { } }
                ],
                // { cancelable: false }
            )
        } else {
          const errors = dataReturned?.errors?.fullMessages
          console.log(errors)
            Alert.alert(
                errors[0],
                "",
                [
                    { text: "OK", onPress: () => { } }
                ],
                // { cancelable: false }
            )
        }
    }

    const updateExistingLeftover = async (id) => {
      let quantity = wholeTitle + " " + partTitle
      if (partTitle === parts[0]) quantity = wholeTitle
      if (wholeTitle == 0) quantity = partTitle
      const data = await updateLeftover({
          variables: {
              value: {
                  id: id,
                  attributes: {
                      ingredientName: ingredientName,
                      quantity: quantity.toString(),
                      unit: unitTitle,
                      category: ingredientCat
                  }
              }
          }
      })
      const dataReturned = data?.data?.updateLeftover
      if (dataReturned.groceryUpdated) refetch()
      if (dataReturned.leftover) {
        Alert.alert(
            "Ingredient Updated",
            "",
            [
                { text: "OK", onPress: () => {
                  // setIngredientValue('')
                } }
            ],
            // { cancelable: false }
        )
    } else {
        const errors = dataReturned?.errors?.fullMessages
        Alert.alert(
            errors[0],
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
          name={editIngredient ? ingredientValue : ingredientName}
          quantity={(wholeTitle == 0 ? '' : wholeTitle) + (partTitle.includes('/') ? " " + partTitle : "")}
          unit={unitTitle}
        />
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
            whole={wholeTitle}
            part={partTitle}
            wholeCallback={value => setWholeTitle(value)}
            partCallback={value => setPartTitle(value)}
            parts={parts}
          />
          <View style={styles.rightContainer}>
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
                    else editIngredient ? createNewLeftover() : updateExistingLeftover(item.id)
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

export default AddEditLeftover
