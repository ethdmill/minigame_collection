// renders category list numbers
export const categoryLabels = (index: number) => {
  return (index < 9) ? `0${index + 1}` : `${index + 1}`
}