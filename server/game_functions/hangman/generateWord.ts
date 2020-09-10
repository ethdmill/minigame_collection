import words from '../../data/hangman/words'

export default function generateWord() {
  return words[Math.round(Math.random() * (words.length - 1))]
}