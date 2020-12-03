import { Dimensions } from 'react-native'

const adjuster = 100
const windowWidth = Dimensions.get('window').width
const windowWidthAdjuster = windowWidth + adjuster

export { adjuster, windowWidth, windowWidthAdjuster }