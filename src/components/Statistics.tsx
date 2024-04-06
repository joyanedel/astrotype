import { keyboardEventsReducer } from "$lib/process"
import userEvents from "$store/userEvents"

function Statistics() {
  const events = userEvents.get()

  const firstEventTimestamp = new Date(events[0]?.timestamp || "0")
  const lastEventTimestamp = new Date(events.at(-1)?.timestamp || "0")
  const durationInSeconds = (lastEventTimestamp.getTime() - firstEventTimestamp.getTime()) / 1000

  const wordsTyped = keyboardEventsReducer(events).split(' ').length

  const wordsPerMinute = Math.round(wordsTyped / (durationInSeconds / 60))

  return (
    <section className="flex flex-col">
      <h2 className="text-6xl py-20">Statistics</h2>
      <div className="flex flex-col">
        <div className="grid grid-cols-2">
          <strong>Duration:</strong>
          <p>{durationInSeconds} seconds</p>
        </div>
        <div className="grid grid-cols-2">
          <strong>Words typed:</strong>
          <p>{wordsTyped}</p>
        </div>
        <div className="grid grid-cols-2">
          <strong>Words per minute:</strong>
          <p>{wordsPerMinute}</p>
        </div>
      </div>
    </section>
  )
}

export default Statistics
