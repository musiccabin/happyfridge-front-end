import React, { useState } from 'react'
import { Meals } from '../components'

const Completed = () => {

    let arr = [1, 2, 3, 4, 5, 6, 7]
    const [data, setData] = useState(arr)

    return (
        <Meals data={data} emptyTitle={`You haven't completed any meals yet. Let's get started!`} />
    )
}

export default Completed