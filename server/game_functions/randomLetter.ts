import letters from '../data/letters'

export default function randomLetter() {
  return letters[Math.round(Math.random() * (letters.length - 1))]
}