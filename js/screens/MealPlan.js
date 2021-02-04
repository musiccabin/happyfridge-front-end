import React, { useState, useContext } from 'react'
import { Meals } from '../components'
import { recipesInMealplanQuery } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { Context } from '../context'


// if (Context.refreshMealplan) {
//     this.render()
//     Context.refreshMealplan = false
// }

const MealPlan = () => {

    // let arr = [1, 2, 3, 4, 5, 6, 7]
    // const [data, setData] = useState(arr)

    // return (
    //     <Meals data={data} emptyTitle={`You don’t have any meal plan yet.\n Why not add a recipe?`} showClearButton={true} />
    // )

    const { refreshPageContext } = useContext(Context)
    const [refreshPage, setRefreshPage] = refreshPageContext
    // console.log('in mealplan, refreshMealplan from context is: ', refreshMealplan)

    
    const { data, error, loading, networkStatus, refetch } = useQuery(recipesInMealplanQuery, { notifyOnNetworkStatusChange: true })
    if (loading || networkStatus === 4) return null
    if (error) console.error(error)

    if (refreshPage) {
        refetch()
        setRefreshPage(false)
    }

    // console.log('recipes in mealplan are: ', data.recipesInMealplan)
    // console.log('how many?', data.recipesInMealplan.length)

    return (
        <Meals
        data={data.recipesInMealplan}
        emptyTitle={`You don't have any meal plan yet. \n Why not add a recipe?`}
        showClearButton={true}/>
    )

}

export default MealPlan