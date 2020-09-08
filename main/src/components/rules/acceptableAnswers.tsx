import React from 'react'
import './rules.css'

export default function AcceptableAnswers() {
  return(
    <div className="mt-4">
      <h3 className="text-center mb-3">Rules for Acceptable Answers</h3>
      <ul className="list-group list">
        <li className="my-1">Answers must fit their respective category.</li>
        <li className="my-1">The first word of your answer must begin with the key letter.</li>
        <li className="my-1">The articles "A", "An", and "The" do not count.</li>
        <li className="my-1">The same answer cannot be given more than once in the same round.</li>
        <li className="my-1">If two or more players give the same answer for the same category, their answers cancel out.</li>
        <li className="my-1">When answering with a proper name, you may use the first or last name.</li>
        <li className="my-1">Creative answers can be acceptable, but generally, just using an adjective is not.</li>
        <li className="my-1">Answers can (and likely will) be contested, and are ultimately decided on by a majority vote.</li>
      </ul>
    </div>
  )
}