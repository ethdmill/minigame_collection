export default function serverTimer() {
  const timerPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    //TODO: switch this back to 180 at some point
    // }, 180*1000)
    }, 5*1000)
  })
  return timerPromise
}
