import React, { useContext } from 'react'
import { Meals } from '../components'
import {favRecipesQuery} from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Context } from '../context'

const FavoriteMeals = () => {
    const { refreshPageContext } = useContext(Context)
    const [refreshPage, setRefreshPage] = refreshPageContext

    const { data, error, loading, refetch, networkStatus } = useQuery(favRecipesQuery, { notifyOnNetworkStatusChange: true })
    if (loading || networkStatus === 4) return null
    if (error) console.error(error)

    console.log('in favourites, before: ', refreshPage)
    if (refreshPage) {
        refetch()
        setRefreshPage(false)
    }
    console.log('in favourites, after: ', refreshPage)
    console.log('fav recipes are: ', data.favRecipes)
    console.log('how many? ', data.favRecipes.length)

    return (
        <Meals data={data.favRecipes} emptyTitle={`Looks like you haven't added any favorite recipes.`} />
    )
}

export default FavoriteMeals