let result = []
for (let i = 0; i < 25; i++) {
  result.push(
    {
      id: Math.random(i) * 1000,
      name: 'banana',
      category: 'produce',
      quantity: '1',
      unit: 'lb',
    },
    {
      id: Math.random(i) * 1000,
      name: 'chicken',
      category: 'meat',
      quantity: '2',
      unit: 'lb',
    },
    {
      id: Math.random(i) * 1000,
      name: 'frozen beans',
      category: 'frozen',
      quantity: '3',
      unit: 'lb',
    },
    {
      id: Math.random(i) * 1000,
      name: 'milk',
      category: 'dairy',
      quantity: '3',
      unit: 'lb',
    },
    {
      id: Math.random(i) * 1000,
      name: 'almond',
      category: 'nuts',
      quantity: '3',
      unit: 'lb',
    }
  )
}
const produceData = result?.filter(item => item.category === 'produce')
const meatData = result?.filter(item => item.category === 'meat')
const frozenData = result?.filter(item => item.category === 'frozen')
const dairyData = result?.filter(item => item.category === 'dairy')
const nutsData = result?.filter(item => item.category === 'nuts')

export { produceData, meatData, frozenData, dairyData, nutsData }
