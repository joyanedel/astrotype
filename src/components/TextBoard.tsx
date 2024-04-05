import type { KeyboardRegisteredEvent } from '$lib/types'
import { getTargetTextAlreadyTypedWords, getTargetTextCurrentWord, getTargetTextIncomingWords, handleKeyDown, keyboardEventsReducer } from '$lib/process'
import { useEffect, useState } from 'preact/hooks'

const ACCEPTABLE_CHARACTERS = /^([a-z]|backspace| )$/

interface TextBoardProps {
  targetText: string
}

export function TextBoard(props: TextBoardProps) {
  const [currentRegisteredEvents, setCurrentRegisteredEvents] = useState<KeyboardRegisteredEvent[]>([])

  const handleEvent = (e: KeyboardEvent) => {
    const eventKey = e.key.toLowerCase()
    if (!ACCEPTABLE_CHARACTERS.test(eventKey)) return

    const currentLastChar = keyboardEventsReducer(currentRegisteredEvents).at(-1)
    const newEvent = handleKeyDown(eventKey, currentLastChar)
    setCurrentRegisteredEvents([...currentRegisteredEvents, newEvent])
  }

  const currentText = keyboardEventsReducer(currentRegisteredEvents)

  const currentUserWords = getTargetTextAlreadyTypedWords(currentText, currentText)
  const currentTargetWord = getTargetTextCurrentWord(props.targetText, currentText)

  const alreadyTypedUserWords = getTargetTextAlreadyTypedWords(currentText, currentText)
  const alreadyTypedTargetWords = getTargetTextAlreadyTypedWords(props.targetText, currentText)

  const incomingTargetWords = getTargetTextIncomingWords(props.targetText, currentText)

  return (
    <>
      <section className="tracking-widest p-20 text-2xl">
        {
          alreadyTypedTargetWords.map((word, index) => (
            <span key={index} className="text-gray-400">{word} </span>
          ))
        }

        {currentTargetWord && <span className="text-blue-400">{currentTargetWord}</span>}

        {
          incomingTargetWords.map((word, index) => (
            <span key={index} className="text-gray-400"> {word}</span>
          ))
        }
      </section>
      <input className="w-full p-4 text-2xl opacity-0 h-full -z-[-999] absolute" onKeyDown={handleEvent} />
    </>
  )
}
