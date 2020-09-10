import React from 'react'
import socketio, { Socket } from 'socket.io-client'
import Timer from './timer'
import UserInputs from './userInputs'
import './game.css'

export interface SubmittedAnswer {
  userInput: string,
  correct: boolean,
}

export default function Game () {

  // various states for the whole game
  const [list, setList] = React.useState<string[]>([])
  const [letter, setLetter] = React.useState<string>()
  const [connection, setConnection] = React.useState<typeof Socket>()
  const [timeRemaining, setTimeRemaining] = React.useState<number>(180)
  const [disableInputs, setDisableInputs] = React.useState<boolean>(true)
  const [disableStartButton, setDisableStartButton] = React.useState<boolean>(true)
  const [disableGenerateButton, setDisableGenerateButton] = React.useState<boolean>(false)

  // initial answer/point values and another default state
  const initialValues = Array.from({ length: 12 }).map(() => ({ userInput: "", correct: false })) as SubmittedAnswer[]
  const [answers, setAnswers] = React.useState<SubmittedAnswer[]>(initialValues)

  // initializes lobby and connects to source files
  React.useEffect(
    () => {
      const connection = socketio('/lobby')
      setConnection(connection)

      //initializes list genration functionality
      connection.on('list_generated', (list: string[]) => {
        setList(list)
      })

      // initializes random letter functionality
      connection.on('letter_generated', (letter: string) => {
        setLetter(letter)
      })

      // initializes timer functionality
      connection.on('timer_ended', () => {})
    },
    []
  )

  // disables user inputs when timer reaches 0
  React.useEffect(() => {
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
  const handleGenerateListClick = () =>{ 
    connection?.emit('generate_list')
    setDisableStartButton(false)
  }

  // on button click -- sets time remaining, starts timer, enables inputs, disables start/list/letter buttons
  const handleStartClick = () => {
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
          <button onClick={() => handleGenerateListClick()} disabled={disableGenerateButton}>Generate a list!</button>
        </div>
        <div className="px-3">
          <button onClick={() => handleStartClick()} disabled={disableStartButton}>Start the game!</button>
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