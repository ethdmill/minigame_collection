import React, { useEffect, useState } from 'react'
import socketio, { Socket } from 'socket.io-client'
import Timer from './timer'
import UserInputs from './userInputs'
import './game.css'

// TODO: set timer back to 3 minutes (maybe add settable timer?)
// TODO: multiplayer functionality
// TODO: scoreboard system
// TODO: end-of-round individual answer reveal (multiplayer)
// TODO: add more categories
// TODO: addable/removable user inputs
// TODO: adjustable/hideable timer (reappears when it hits 0? 5 seconds? 10 seconds?)


export interface SubmittedAnswer {
  userInput: string,
  correct: boolean,
}

export default function Game () {

  // various states for the game
  const [list, setList] = useState<string[]>([])
  const [letter, setLetter] = useState<string>()
  const [connection, setConnection] = useState<typeof Socket>()
  const [timeRemaining, setTimeRemaining] = useState<number>(180)
  const [disableInputs, setDisableInputs] = useState<boolean>(true)
  const [disableStartButton, setDisableStartButton] = useState<boolean>(true)
  const [disableGenerateButton, setDisableGenerateButton] = useState<boolean>(false)

  // initial answer/point values and another default state
  const initialValues = Array.from({ length: 12 }).map(() => ({ userInput: "", correct: false })) as SubmittedAnswer[]
  const [answers, setAnswers] = useState<SubmittedAnswer[]>(initialValues)

  // initializes lobby and connects to source files
  useEffect(
    () => {
      const connection = socketio('/lobby')
      setConnection(connection)

      // initializes list genration
      connection.on('list_generated', (list: string[]) => {
        setList(list)
      })

      // initializes random letter
      connection.on('letter_generated', (letter: string) => {
        setLetter(letter)
      })

      // initializes timer
      connection.on('timer_ended', () => {})
    },
    []
  )

  // disables user inputs when timer reaches 0
  useEffect(() => {
    if (timeRemaining === 0) {
      setDisableInputs(true)
    }
  }, [timeRemaining])

  // starts and stops timer
  const countdownTimer = (limit: number) => {
    let i = 0;
    let timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1)
      if (i === limit - 1) {
        clearInterval(timer)
        setTimeRemaining(180)
        setDisableGenerateButton(false)
      }
      i++
    }, 1000)
  }

  // on button click -- generates a category list
  const handleGenerateList = () => { 
    connection?.emit('generate_list')
    setDisableStartButton(false)
  }

  // on button click -- sets time remaining, starts timer, enables inputs, disables start/list/letter buttons
  const handleStart = () => {
    connection?.emit('generate_letter')
    setTimeRemaining(5)
    countdownTimer(5)
    setDisableInputs(false)
    setDisableStartButton(true)
    setDisableGenerateButton(true)
    setAnswers(initialValues)
  }

  // keeps track of checkboxes
  const handleCheck = (index: number) => {
    let answer = answers[index]
    answer.correct = !answer.correct
    let newAnswers = [...answers]
    newAnswers[index] = answer
    setAnswers(newAnswers)
  }

  // keeps track of text inputs
  const handleText = (input: string, index: number) => {
    let text = answers[index]
    text.userInput = input
    let newText = [...answers]
    newText[index] = text
    setAnswers(newText)
  }

  // game point system
  const points = answers.reduce((acc, cur) => acc + (cur.correct ? 1 : 0), 0)

  return (
    <div>
      <div className="d-flex flew-row justify-content-center pt-4 pb-1">
        <div className="px-3">
          <button onClick={() => handleGenerateList()} disabled={disableGenerateButton}>Get a list!</button>
        </div>
        <div className="px-3">
          <button onClick={() => handleStart()} disabled={disableStartButton}>Start the game!</button>
        </div>
      </div>
      <div className="d-flex flew-row justify-content-center py-2 info">
        <div className="px-4">
          <h2>Letter: {letter ? letter : "?"}</h2>
        </div>
        <div className="px-4">
          <Timer time={timeRemaining} />
        </div>
        <h2 className="px-4">
          Points: {points}
        </h2>
      </div>
      <div className="d-flex flew-row justify-content-center">
        <UserInputs disabled={disableInputs} answers={answers} handleCheck={handleCheck} handleText={handleText} prompts={list} />
      </div>
    </div>
  )
}