import React from 'react'
import { Meals } from '../components'
import {completedRecipesQuery} from '../graphql/queries'
import { useQuery } from '@apollo/client'

const Completed = () => {
    const { data, error, loading } = useQuery(completedRecipesQuery)
    if (loading) return null
    if (error) console.error(error)
    return (
        <Meals data={data.completedRecipes} emptyTitle={`Looks like you haven't completed any recipes.`} />
    )
}

export default Completed