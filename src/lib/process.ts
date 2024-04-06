import type { CharMatch, KeyboardRegisteredEvent } from "./types"

/**
 * Handle key down event and return an event data
*/
export const handleKeyDown = (eventKey: string, lastChar?: string): KeyboardRegisteredEvent => {
  const timestamp = new Date().toISOString()
  if (eventKey === ' ') {
    console.log(lastChar)
    return { type: 'SPACE', ignore: lastChar == ' ', timestamp }
  } else if (eventKey === 'backspace') {
    return { type: 'BACKSPACE', timestamp }
  }
  return { type: 'CHAR', value: eventKey, timestamp }
}

export const keyboardEventsReducer = (state: readonly KeyboardRegisteredEvent[]): string => {
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

export const processWord = (targetWord: string, userWord: string): CharMatch[] => {
  const maxLength = Math.max(targetWord.length, userWord.length)
  const targetWordPadded = targetWord.padEnd(maxLength, ' ')

  return targetWordPadded.split('').map((char, index) => {
    if (char === userWord[index]) {
      return { char, status: 'CORRECT' }
    } else if (userWord[index] === undefined) {
      return { char, status: 'MISSED' }
    } else if (char === ' ') {
      return { char: userWord[index], status: 'OVERTYPED' }
    }
    return { char, status: 'INCORRECT' }
  })
}
