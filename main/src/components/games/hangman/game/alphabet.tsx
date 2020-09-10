import React from 'react'
import './alphabet.css'

const alphabetArray = () => {
  let alphabet = Array.apply(null, Array(26)).map((_x, i) => 
    <button className="alphabet" key={i}>
      {String.fromCharCode(65 + i)}
    </button>
  )
  return alphabet
}

export default function Alphabet() {
  return (
    <h1 className="alphabet-container">
      {alphabetArray()}
    </h1>
  )
}