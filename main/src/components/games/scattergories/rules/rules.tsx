import React from 'react'
import AcceptableAnswers from './acceptableAnswers'
import './rules.css'

export default function Rules() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="d-flex flex-column">
        <div className="pt-4 pb-3 mt-4">
          <h2 className="text-center mb-3">How to Play</h2>
          <ul className="list-group list">
            <li className="my-1">The game is played in three rounds. One round is played as follows:</li>
            <li className="my-1">Each player will have three minutes to fill in their form fields with answers.</li>
            <li className="my-1">Pressing the "Generate a list!" button will generate a list of categories.</li>
            <li className="my-1">Pressing the "Start the game!" button will select a random key letter and start the timer.</li>
            <li className="my-1">Once the timer has expired, the round is over.</li>
            <li className="my-1">Players reveal their answers in turn and compare them to other players' answers.</li>
            <li className="my-1">One point is awarded per acceptable answer. Points are tallied at the end of the round.</li>
          </ul>
        </div>
        <AcceptableAnswers />
      </div>
    </div>
  )
}