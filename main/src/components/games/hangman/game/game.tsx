import React from 'react'
import socketio, { Socket } from 'socket.io-client'
import './game.css'
import Alphabet from './alphabet'

export default function Hangman() {

  // various states for the game
  const [word, setWord] = React.useState<string[]>([])
  const [attempts, setAttempts] = React.useState<number>()
  const [blanks, setBlanks] = React.useState<string[]>([])
  const [correct, setCorrect] = React.useState<boolean>()
  const [connection, setConnection] = React.useState<typeof Socket>()
  const [color, setColor] = React.useState<string>()

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
    // return attempts
  }

  // on click -- chooses a random word
  const handleGenerateWordClick = () => {
    connection?.emit('generate_word')
    attemptsRemaining(word)
    wordToDashes(word)
    console.log(attempts)
  }

  // on word generation -- converts word to dashes
  const wordToDashes = (word: string[]) => {
    let dashes = Array.apply(null, Array(word.length)).map(() => "-")    
    // console.log(word)
    // console.log(dashes)
    // console.log(word.length)
    return dashes
  }
  
  const handleGuess = () => {
    // console.log()
    // if answer includes letter of button clicked, replace dashes with letter clicked and set correct
    // if not, set incorrect and remove a life
    return null
  }


  // maybe make this its own component
  const alphabetArray = () => {
    let alphabet = Array.apply(null, Array(26)).map((_x, i) => 
      <button className="alphabet" key={i} style={{color: color}} onClick={() => handleGuess()}>
        {String.fromCharCode(65 + i)}
      </button>
    )
    return alphabet
  }

  // on click -- changes color of letter based on correctness
  const handleLetterColor = (correct: boolean) => {
    correct ? setColor('green') : setColor('red')
  }  

  return (
    <>
      {/* <button onClick={() => handleLetterColor(true)} style={{color: color}}>TEST TEXT PLEASE IGNORE</button> */}
      <div>
        Attempts Remaining: {attempts}
      </div>
      <div>
        <button onClick={() => handleGenerateWordClick()}>Start the game!</button>
        {/* <div>{wordToDashes(word)}</div> */}
        <div>{wordToDashes(word)}</div>
      </div>
      <h1 className="alphabet-container">
        {alphabetArray()}
      </h1>
    </>
  )
}