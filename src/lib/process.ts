import type { KeyboardRegisteredEvent } from "./types"

/**
 * Handle key down event and return an event data
*/
export const handleKeyDown = (eventKey: string, lastChar?: string): KeyboardRegisteredEvent => {
  const timestamp = new Date()
  if (eventKey === ' ') {
    console.log(lastChar)
    return { type: 'SPACE', ignore: lastChar == ' ', timestamp }
  } else if (eventKey === 'backspace') {
    return { type: 'BACKSPACE', timestamp }
  }
  return { type: 'CHAR', value: eventKey, timestamp }
}

export const keyboardEventsReducer = (state: KeyboardRegisteredEvent[]): string => {
  return state.reduce((acc, event) => {
    if (event.type === 'CHAR') {
      return acc + event.value
    } else if (event.type === 'SPACE') {
      return event.ignore ? acc : acc + ' '
    } else if (event.type === 'BACKSPACE') {
      return acc.slice(0, -1)
    }
    return acc
  }, '' as string)
}

export const getTargetTextIncomingWords = (targetInput: string, userInput: string) => {
  const targetWords = targetInput.split(' ')
  const userWords = userInput.split(' ')

  return targetWords.slice(userWords.length)
}

export const getTargetTextAlreadyTypedWords = (targetInput: string, userInput: string) => {
  const targetWords = targetInput.split(' ')
  const userWords = userInput.split(' ')

  return targetWords.slice(0, userWords.length - 1)
}

export const getTargetTextCurrentWord = (targetInput: string, userInput: string) => {
  const targetWords = targetInput.split(' ')
  const userWords = userInput.split(' ')

  return targetWords[userWords.length - 1]
}
