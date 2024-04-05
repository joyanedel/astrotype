import { test, expect, describe } from "vitest"

import { getTargetTextCurrentWord, getTargetTextAlreadyTypedWords, getTargetTextIncomingWords } from "./process"


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
