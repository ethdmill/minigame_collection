import React from 'react'
import './rules.css'

export default function Rules() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="d-flex flex-column">
        <div className="pt-4 pb-3 mt-4">
          <h2 className="text-center mb-3">How to Play</h2>
          <ul className="list-group list">
            <li className="my-1">A series of blanks will appear on the screen.</li>
            <li className="my-1">These represent the letters in the answer word.</li>
            <li className="my-1">Click on a letter in the letter pool to guess.</li>
            <li className="my-1">Correct letters will turn green, and incorrect letters will turn red.</li>
            <li className="my-1">The game ends when you guess the word correctly or run out of lives.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}