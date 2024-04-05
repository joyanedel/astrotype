import type { KeyboardRegisteredEvent } from '$lib/types'
import { getTargetTextAlreadyTypedWords, getTargetTextCurrentWord, getTargetTextIncomingWords, handleKeyDown, keyboardEventsReducer } from '$lib/process'
import AlreadyTypedWord from './AlreadyTypedWord'
import { useState, type KeyboardEventHandler, type KeyboardEvent } from 'react'
import React from 'react'
import CurrentWord from './CurrentWord'

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

  const currentWord = currentText.split(' ').at(-1) || ''
  const currentTargetWord = getTargetTextCurrentWord(props.targetText, currentText)

  const alreadyTypedUserWords = getTargetTextAlreadyTypedWords(currentText, currentText)
  const alreadyTypedTargetWords = getTargetTextAlreadyTypedWords(props.targetText, currentText)

  const incomingTargetWords = getTargetTextIncomingWords(props.targetText, currentText)

  const isFinished = props.targetText.length > 0
    && (
      (incomingTargetWords.length === 0 && currentWord.length === currentTargetWord?.length)
      || (alreadyTypedTargetWords.length === props.targetText.split(' ').length)
    )

  if (isFinished) {
    window.location.href = '/completed'
  }

  return (
    <>
      <section className="tracking-widest p-20 text-2xl gap-4 flex w-screen flex-wrap">
        {
          alreadyTypedUserWords.map((word, index) => (
            <AlreadyTypedWord key={index} targetWord={alreadyTypedTargetWords[index]} userWord={word} />
          ))
        }

        <CurrentWord targetWord={currentTargetWord} userWord={currentWord} />

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
