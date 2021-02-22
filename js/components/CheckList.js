import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { COLORS, globalStyles, windowWidth } from '../styles'
import { Context } from '../context'

import { Button } from '../components'

import { useMutation, useQuery } from '@apollo/client'
import { updateUserMutation } from '../graphql/mutations'
import { popularRecipesQuery, recommendedRecipesQuery, userDietaryRestrictionsQuery, userTagsQuery } from '../graphql/queries'

const CheckList = ({ data, inheritStyles, userId, dietary, tags, updateDietary, updateTags, category }) => {
    const { refreshHomeContext } = useContext(Context)
    const [refreshHome, setRefreshHome] = refreshHomeContext

    const fetchRecommendations = useQuery(recommendedRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
    const fetchPopularRecipes = useQuery(popularRecipesQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
    const fetchDietary = useQuery(userDietaryRestrictionsQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
    const fetchTags = useQuery(userTagsQuery, { notifyOnNetworkStatusChange: true }, { fetchPolicy: 'cache-and-network' })
    const [updatePreferences] = useMutation(updateUserMutation)

    const updatePreference = (id) => { 
        let input
        if (category === 'dietary') {
            let dietaryIds = data.map(item => item['checked'] ? parseInt(item['id']): null)
            if (dietaryIds.includes(id)) {
                dietaryIds = dietaryIds.filter(existingId => existingId !== id)
            } else {
                dietaryIds.push(id)
            }
            for (let item of data) {
                if (item.id == id) {
                    const checked = item['checked']
                    item['checked'] = !checked
                    updateDietary(data)
                    break
                }
            }
            const tagIds = tags.map(item => item['checked'] ? parseInt(item['id']): null)
            input = { id: userId, dietaryRestrictions: dietaryIds, tags: tagIds, attributes: {} }
        } else {
            let tagIds = data.map(item => item['checked'] ? parseInt(item['id']): null)
            if (tagIds.includes(id)) {
                tagIds = tagIds.filter(existingId => existingId != id)
            } else {
                tagIds.push(id)
            }
            for (let item of data) {
                if (item.id == id) {
                    const checked = item['checked']
                    item['checked'] = !checked
                    updateTags(data)
                    break
                }
            }
            const dietaryIds = dietary.map(item => item['checked'] ? parseInt(item['id']): null)
            input = { id: userId, tags: tagIds, dietaryRestrictions: dietaryIds, attributes: {} }
        }
        updatePreferences({ variables: { value: input }}, { refetchQueries: [
            { query: popularRecipesQuery},
            { query: recommendedRecipesQuery },
            { query: userTagsQuery},
            { query: userDietaryRestrictionsQuery },
          ], awaitRefetchQueries: true, notifyOnNetworkStatusChange: true }).then(({ data }) => {
              if (data.updateUser.user) {
                  console.log('in if block')
                  fetchPopularRecipes.refetch()
                  fetchRecommendations.refetch()
                  fetchDietary.refetch()
                  fetchTags.refetch()
                  setRefreshHome(true)
                  console.log('after setting, refreshHome is: ', refreshHome)
              }
          }) 
     }

    return (
        <FlatList
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            data={data}
            numColumns={3}
            style={inheritStyles}
            keyExtractor={item => item.id.toString()}
            renderItem={
                ({ item }) =>
                    <Button
                        onPress={() => {
                            updatePreference(parseInt(item.id))}
                        }
                        // disabled={item.visibility}
                        style={[styles.button, item.checked ? styles.checkedButton : styles.unCheckedButton]}
                        >
                        <Text style={globalStyles.titleM}>{item.title} </Text>
                    </Button>
            }
        />
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 10,
        width: ((windowWidth - 60) / 3) - 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderColor: COLORS.PRIMARY,
        marginVertical: 10,
        borderWidth: 1
    },
    checkedButton: {
        backgroundColor: COLORS.PRIMARY_ICON,
    },
    unCheckedButton: {
        backgroundColor: COLORS.WHITE,
    },
    hidden: {
        opacity: 0
    }
})

export default CheckList