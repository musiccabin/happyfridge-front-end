import React from 'react'
import { Meals } from '../components'
import {favRecipesQuery} from '../graphql/queries'
import { useQuery } from '@apollo/client'

const FavoriteMeals = () => {
    const { data, error, loading } = useQuery(favRecipesQuery)
    if (loading) return null
    if (error) console.error(error)
    return (
        <Meals data={data.favRecipes} emptyTitle={`Looks like you haven't added any favorite recipes.`} />
    )
}

export default FavoriteMeals