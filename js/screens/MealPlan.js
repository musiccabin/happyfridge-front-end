import React, { useState } from 'react'
import { Meals } from '../components'

const MealPlan = () => {

    let arr = [1, 2, 3, 4, 5, 6, 7]
    const [data, setData] = useState(arr)

    return (
        <Meals data={data} emptyTitle={`You don’t have any meal plan yet.\n Why not add a recipe?`} showClearButton={true} />
    )
}

export default MealPlan