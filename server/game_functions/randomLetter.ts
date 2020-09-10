import letters from '../data/scattergories/letters'

export default function randomLetter() {
  return letters[Math.round(Math.random() * (letters.length - 1))]
}