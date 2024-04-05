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
