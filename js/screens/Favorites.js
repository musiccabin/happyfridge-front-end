import React, { useState } from 'react'
import { Meals } from '../components'

const FavoriteMeals = () => {

    let arr = [1, 2, 3, 4, 5, 6, 7]
    const [data, setData] = useState(arr)

    return (
        <Meals data={data} emptyTitle={`Looks like you haven't added any favorite recipes.`} />
    )
}

export default FavoriteMeals