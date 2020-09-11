import { eventNames } from 'cluster'
import React from 'react'
import socketio, { Socket } from 'socket.io-client'
import './game.css'

export default function Hangman() {

  // various states for the game
  const [word, setWord] = React.useState<string[]>([])
  // const [dashes, setDashes] = React.useState<string[]>([])
  const [attempts, setAttempts] = React.useState<number>()
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([])
  const [correct, setCorrect] = React.useState<boolean>()
  const [connection, setConnection] = React.useState<typeof Socket>()
  const [color, setColor] = React.useState<string>()
  // ! const [disableLetters, setDisableLetters] = React.useState<boolean>(true)

  // initializes lobby and connects to source files
  React.useEffect(
    () => {
      const connection = socketio('/lobby')
      setConnection(connection)

      // initializes word generation
      connection.on('word_generated', (word: string[]) => {
        setWord(word)
      })
    },
    []
  )

  const attemptsRemaining = (word: string[]) => {
    if (word.length <= 10) {
      setAttempts(15)
    } else {
      setAttempts(20)
    }
    // console.log(word)
    // console.log(attempts)
    return attempts
  }

  // on click -- chooses a random word
  const handleGenerateWordClick = () => {
    connection?.emit('generate_word')
    attemptsRemaining(word)
    wordToDashes(word)
    // ! setDisableLetters(false)
    setColor('')
    // setDashes(wordToDashes(word))
    console.log(attempts)
    // console.log(dashes)
  }

  // on word generation -- converts word to dashes
  const wordToDashes = (word: string[]) => {
    let wordDashes = Array.apply(null, Array(word.length)).map(() => "-")    
    // console.log(word)
    // console.log(dashes)
    // console.log(word.length)
    // setDashes(wordDashes)
    // console.log(dashes)
    return wordDashes
  }

  // on click -- changes color of letter based on correctness
  const handleLetterColor = (correct: boolean) => {
    //update to better shade of green
    correct ? setColor('green') : setColor('red')
  }



  const handleLetterClick = (e: React.MouseEvent<HTMLElement>) => {
    let letter = e.currentTarget.getAttribute('value')!
    let color = e.currentTarget.getAttribute('style')
    // check for correctness -- if correct, turn green and reveal. if not, turn red and leave dash.
    // either way, push letter into guessed letters array.
    // if letter is in guessed letters, do not push.

    console.log(color)

    // console.log(word)
    if (word.includes(letter)) {
      console.log("TRUE")
      handleLetterColor(true)
    } else {
      console.log("FALSE")
      handleLetterColor(false)
    }

    // console.log(letter)
    guessedLetters.push(letter)

    // handleLetterColor(false)

    // console.log(guessedLetters)
    setGuessedLetters(guessedLetters)
  }



  // maybe make this its own component
  const alphabetArray = () => {
    let alphabet = Array.apply(null, Array(26)).map((_x, i) => 
      <button 
        className="alphabet"
        key={i}
        value={`${String.fromCharCode(65 + i).toLowerCase()}`}
        style={{color: color}}
        onClick={handleLetterClick}
        // ! disabled={disableLetters}
      >
        {String.fromCharCode(65 + i)}
      </button>
    )
    return alphabet
  }

  return (
    <>
      <div>
        Attempts Remaining: {attempts}
      </div>
      <div>
        <button onClick={() => handleGenerateWordClick()}>Start the game!</button>
        {/* <div>{wordToDashes(word)}</div> */}
        <h1 className="dashes">{wordToDashes(word)}</h1>
      </div>
      <h1 className="alphabet-container">
        {alphabetArray()}
      </h1>
    </>
  )
}