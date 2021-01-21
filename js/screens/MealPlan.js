import React, { useState } from 'react'
import { Meals } from '../components'
import { recipesInMealplanQuery } from '../graphql/queries'

import { useQuery } from '@apollo/client'


const MealPlan = () => {

    // let arr = [1, 2, 3, 4, 5, 6, 7]
    // const [data, setData] = useState(arr)

    // return (
    //     <Meals data={data} emptyTitle={`You don’t have any meal plan yet.\n Why not add a recipe?`} showClearButton={true} />
    // )
    
    const { data, error, loading } = useQuery(recipesInMealplanQuery)
    if (loading) return null
    if (error) console.error(error)
    return (
        <Meals data={data.recipesInMealplan} emptyTitle={`You don't have any meal plan yet. \n Why not add a recipe?`} showClearButton={true}/>
    )

}

export default MealPlan