import categories from '../data/categories'

export default function generateList () {
  let newList = []
  while (newList.length < 12) {
    let selection: string = categories[Math.round(Math.random() * (categories.length - 1))]
    if (newList.includes(selection)) {
      continue
    } else {
      newList.push(selection)
    }
  }
  return newList
}