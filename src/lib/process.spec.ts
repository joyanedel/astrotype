import { test, expect, describe } from "vitest"

import { getTargetTextCurrentWord, getTargetTextAlreadyTypedWords, getTargetTextIncomingWords, processWord } from "./process"


describe('getTargetTextCurrentWord', () => {
  test("getTargetTextCurrentWord returns sit", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum s'

    const result = getTargetTextCurrentWord(targetInput, sutInput)

    expect(result).toBe('sit')
  })

  test("getTargetTextCurrentWord returns lorem", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = ''

    const result = getTargetTextCurrentWord(targetInput, sutInput)

    expect(result).toBe('lorem')
  })

  test("getTargetTextCurrentWord returns amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum sit '

    const result = getTargetTextCurrentWord(targetInput, sutInput)

    expect(result).toBe('amet')
  })

  test("getTargetTextCurrentWord returns undefined", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum sit amet '

    const result = getTargetTextCurrentWord(targetInput, sutInput)

    expect(result).toBe(undefined)
  })
})

describe('getTargetTextAlreadyTypedWords', () => {
  test("getTargetTextAlreadyTypedWords returns lorem ipsum", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum'

    const result = getTargetTextAlreadyTypedWords(targetInput, sutInput)

    expect(result).toStrictEqual(['lorem'])
  })

  test("getTargetTextAlreadyTypedWords returns lorem ipsum sit", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum '

    const result = getTargetTextAlreadyTypedWords(targetInput, sutInput)

    expect(result).toStrictEqual(['lorem', 'ipsum'])
  })

  test("getTargetTextAlreadyTypedWords returns lorem ipsum sit amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = ''

    const result = getTargetTextAlreadyTypedWords(targetInput, sutInput)

    expect(result).toStrictEqual([])
  })

  test("getTargetTextAlreadyTypedWords returns lorem ipsum sit amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum sit amet '

    const result = getTargetTextAlreadyTypedWords(targetInput, sutInput)

    expect(result).toStrictEqual(['lorem', 'ipsum', 'sit', 'amet'])
  })
})

describe('getTargetTextIncomingWords', () => {
  test("getTargetTextIncomingWords returns sit amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum sit'

    const result = getTargetTextIncomingWords(targetInput, sutInput)

    expect(result).toStrictEqual(['amet'])
  })

  test("getTargetTextIncomingWords returns ipsum sit amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem'

    const result = getTargetTextIncomingWords(targetInput, sutInput)

    expect(result).toStrictEqual(['ipsum', 'sit', 'amet'])
  })

  test("getTargetTextIncomingWords returns lorem ipsum sit amet", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = ''

    const result = getTargetTextIncomingWords(targetInput, sutInput)

    expect(result).toStrictEqual(['ipsum', 'sit', 'amet'])
  })

  test("getTargetTextIncomingWords returns empty array", () => {
    const targetInput = 'lorem ipsum sit amet'
    const sutInput = 'lorem ipsum sit amet'

    const result = getTargetTextIncomingWords(targetInput, sutInput)

    expect(result).toStrictEqual([])
  })
})

describe('processWord', () => {
  test('processWord returns correct chars', () => {
    const targetWord = 'lorem'
    const userWord = 'lorem'

    const result = processWord(targetWord, userWord)

    expect(result).toStrictEqual([
      { char: 'l', status: 'CORRECT' },
      { char: 'o', status: 'CORRECT' },
      { char: 'r', status: 'CORRECT' },
      { char: 'e', status: 'CORRECT' },
      { char: 'm', status: 'CORRECT' }
    ])
  })

  test('processWord returns incorrect chars', () => {
    const targetWord = 'lorem'
    const userWord = 'larem'

    const result = processWord(targetWord, userWord)

    expect(result).toStrictEqual([
      { char: 'l', status: 'CORRECT' },
      { char: 'o', status: 'INCORRECT' },
      { char: 'r', status: 'CORRECT' },
      { char: 'e', status: 'CORRECT' },
      { char: 'm', status: 'CORRECT' }
    ])
  })

  test('processWord returns overtyped chars', () => {
    const targetWord = 'lorem'
    const userWord = 'loremm'

    const result = processWord(targetWord, userWord)

    expect(result).toStrictEqual([
      { char: 'l', status: 'CORRECT' },
      { char: 'o', status: 'CORRECT' },
      { char: 'r', status: 'CORRECT' },
      { char: 'e', status: 'CORRECT' },
      { char: 'm', status: 'CORRECT' },
      { char: 'm', status: 'OVERTYPED' }
    ])
  })

  test('processWord returns missed chars', () => {
    const targetWord = 'lorem'
    const userWord = 'lor'

    const result = processWord(targetWord, userWord)

    expect(result).toStrictEqual([
      { char: 'l', status: 'CORRECT' },
      { char: 'o', status: 'CORRECT' },
      { char: 'r', status: 'CORRECT' },
      { char: 'e', status: 'MISSED' },
      { char: 'm', status: 'MISSED' }
    ])
  })
})
