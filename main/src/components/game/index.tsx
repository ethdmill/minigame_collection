import React, { useState } from 'react'
import Game from './game'
import AcceptableAnswers from '../rules/acceptableAnswers'

export default function Scattergories() {

  // sets state to show/hide acceptable answer rules
  const [showAcceptableAnswers, setShowAcceptableAnswers] = useState<boolean>(false)

  return(
    <>
      <Game />
      <div >
      <div className="text-center pt-3">
        <button onClick={() => setShowAcceptableAnswers(!showAcceptableAnswers)}>Need help?</button>
      </div>
          
      <div className="d-flex flex-row justify-content-center">
        <div className="d-flex flex-column">
          {showAcceptableAnswers && <AcceptableAnswers />}
        </div>
      </div>
      </div>
    </>
  )
}