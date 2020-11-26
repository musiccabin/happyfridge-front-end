import React, { useState } from 'react';
import { View } from 'react-native';

// screens
import EmptyMealPlan from './EmptyMealPlan';
import FilledMealPlan from './FilledMealPlan';


const MealPlan = () => {

    const [hide, setHide] = useState(false);

    return (
        <View>
            { hide ? <EmptyMealPlan /> : <FilledMealPlan />}
        </View>
    )
}

export default MealPlan;