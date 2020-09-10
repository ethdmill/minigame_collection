import words from '../../data/hangman/words'

export default function generateWord() {
  let word = words[Math.round(Math.random() * (words.length - 1))]
  let wordArray = word.split("")
  return wordArray
}