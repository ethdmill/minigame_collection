import React from 'react'

export default function Timer(props: {time: number}) {
  const minutesLeft = Math.floor(props.time / 60)
  const secondsLeft = props.time % 60
  const formattedSecondsLeft = secondsLeft < 10 ? `${0}${secondsLeft}` : secondsLeft
  return(
    //TODO: change this back to not be an H1 maybe?
    <div>
      <h2>{minutesLeft}:{formattedSecondsLeft}</h2>
    </div>
  )
}