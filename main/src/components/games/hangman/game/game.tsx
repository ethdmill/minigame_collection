import React, { useEffect, useState } from 'react'
import socketio, { Socket } from 'socket.io-client'
import './game.css'

export default function Hangman() {

  const defaultColor = Array.apply(null, Array(26)).map((_x, _i) => '')

  // various states for the game
  const [connection, setConnection] = useState<typeof Socket>()
  const [word, setWord] = useState<string[]>(["-"])
  // ! const [previousWord, setPreviousWord] = useState<string[]>([])
  const [recursion, setRecursion] = useState<boolean>(false)

  // on word generation -- converts word to dashes
  const wordToDashes = (word: string[]) => {
    let wordDashes = Array.apply(null, Array(word.length)).map(() => "-")
    return wordDashes
  }

  const [dashes, setDashes] = useState<string[]>(wordToDashes(word))
  const [attempts, setAttempts] = useState<number>(0)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [color, setColor] = useState<string[]>(defaultColor)
  const [disableLetters, setDisableLetters] = useState<boolean>(true)
  const [disableGenerateWord, setDisableGenerateWord] = useState<boolean>()
  const [disableStart, setDisableStart] = useState<boolean>(true)
  const [disableGiveUp, setDisableGiveUp] = useState<boolean>(true)
  const [flavorText, setFlavorText] = useState<string>('')

  // initializes lobby and connects to source files
  useEffect(
    () => {
      const connection = socketio('/lobby')
      setConnection(connection)

      // initializes word generation
      connection.on('word_generated', (word: string[]) => {
        // setWord(word)
        recursion ? setWord(["r", "e", "c", "u", "r", "s", "i", "o", "n"]) : setWord(word)
        console.log(word.length)
        console.log(word)
        setDashes(wordToDashes(word))
        attemptsRemaining(word)
        setDisableStart(false)
        //fun little easter egg
        // ! if (previousWord === ["r", "e", "c", "u", "r", "s", "i", "o", "n"]) {
        //   setWord(previousWord)
        // }
      })
    },
    []
  )

  // determines remaining attempts at start of game
  const attemptsRemaining = (word: string[]) => {
    if (word.length <= 10) {
      setAttempts(15)
    } else {
      setAttempts(20)
    }
    return attempts
  }

  // generate word button handler
  const handleGenerateWord = () => {
    // recursion ? setWord(["r", "e", "c", "u", "r", "s", "i", "o", "n"]) : connection?.emit('generate_word')
    // if (recursion) {
    //   setWord(["r", "e", "c", "u", "r", "s", "i", "o", "n"])
    // } else {
      connection?.emit('generate_word')
    // }
  }

  // start button handler
  const handleStart = () => {
    setDashes(wordToDashes(word))
    setDisableLetters(false)
    setColor(defaultColor)
    setGuessedLetters([])
    attemptsRemaining(word)
    setDisableGenerateWord(true)
    setDisableStart(true)
    setDisableGiveUp(false)
    if (word === ["r", "e", "c", "u", "r", "s", "i", "o", "n"]) {
      setRecursion(true)
    }
  }

  // give up button handler
  const handleGiveUp = () => {
    setDisableGenerateWord(false)
    setDisableStart(false)
    setDisableLetters(true)
    setDisableGiveUp(true)
  }

  // on click -- deals with guess correctness and alphabet array colors
  const handleLetterClick = (e: React.MouseEvent<HTMLElement>) => {
    let letter = e.currentTarget.getAttribute('value')!
    let id = parseInt(e.currentTarget.getAttribute('id')!)
    // checks to see if word includes guess, then acts accordingly
    if (word.includes(letter)) {
      const newColor = [...color.slice(0, id), '#1E88E5', ...color.slice(id + 1)]
      setColor(newColor)
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          const tempAnswer = [...dashes.slice(0, i), letter.toUpperCase(), ...dashes.slice(i + 1)]
          setDashes(tempAnswer)
        }
      }
    } 
    else {
      const newColor = [...color.slice(0, id), '#D81B6099', ...color.slice(id + 1)]
      setColor(newColor)
    }
    // ensures guessedLetters doesn't accrue repeats and also
    // reduces remaining attempts when a new letter is clicked
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter)
      setAttempts(attempts! - 1)
    }
  }

  // forces user to start new game on win or loss
  useEffect(() => {
    if (!dashes.includes('-') || attempts === 0) {
      setDisableGenerateWord(false)
      setDisableStart(true)
      setDisableLetters(true)
      setDisableGiveUp(true)
      // ! setPreviousWord(word)
    }
  }, [dashes, attempts])

  // maybe make this its own component
  const alphabetArray = () => {
    let alphabet = Array.apply(null, Array(26)).map((_x, i) => 
      <button 
        className="alphabet"
        key={i}
        id={`${i}`}
        value={`${String.fromCharCode(65 + i).toLowerCase()}`}
        style={{color: color[i]}}
        onClick={handleLetterClick}
        disabled={disableLetters}
      >
        {String.fromCharCode(65 + i)}
      </button>
    )
    return alphabet
  }

  // adds flavor text best on number of attempts remaining
  useEffect(() => {
    if (attempts === 0 && dashes.includes('-')) {
      setFlavorText('Nice try! Play again?')
    } else if (attempts === 0 && !dashes.includes('-')) {
      setFlavorText('Nice job! Play again?')
    } else if(attempts <= 5 && attempts > 0) {
      setFlavorText('Be careful!')
    } else if (attempts <= 10 && attempts > 5) {
      setFlavorText("You've got this!")
    } else if (attempts > 10) {
      setFlavorText('Give it your best shot!')
    }
  })

  return (
    <>
      <div className="d-flex flew-row justify-content-center pt-4 pb-1">
        <div className="px-3">
          <button onClick={() => handleGenerateWord()} disabled={disableGenerateWord}>Get a word!</button>
        </div>
        <div className="px-3">
          <button onClick={() => handleStart()} disabled={disableStart}>Start the game!</button>
        </div>
        <div className="px-3">
          <button onClick={() => handleGiveUp()} disabled={disableGiveUp}>Give up?</button>
        </div>
      </div>
      <div className="d-flex flew-row justify-content-center py-3 my-1">
        <h3>
          Attempts Remaining: {attempts}
        </h3>
      </div>
      <div className="d-flex flew-row justify-content-center py-2">
        <h1 className="dashes">{dashes}</h1>
      </div>
      <div className="d-flex flew-row justify-content-center py-2">
        <h1 className="alphabet-container">
          {alphabetArray()}
        </h1>
      </div>
      <div className="d-flex flew-row justify-content-center py-2">
        <h4>
          {flavorText}
        </h4>
      </div>
    </>
  )
}
