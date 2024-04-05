export type KeyboardRegisteredEvent = {
  timestamp: Date
} & ({
  type: 'CHAR'
  value: string
} | {
  type: 'SPACE'
  ignore: boolean
} | {
  type: 'BACKSPACE'
})

export type CharMatch = {
  char: string
  status: 'CORRECT' | 'INCORRECT' | 'MISSED' | 'OVERTYPED'
}
