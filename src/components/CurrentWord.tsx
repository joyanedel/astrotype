import React from "react"
import AlreadyTypedWord from "./AlreadyTypedWord"

interface CurrentWordProps {
  targetWord: string
  userWord: string
}

function CurrentWord(props: CurrentWordProps) {
  const alreadyTypedTargetChars = props.targetWord.slice(0, props.userWord.length)
  const incomingTargetChars = props.targetWord.slice(props.userWord.length) || ''

  return (
    <div className="relative h-fit w-fit flex">
      <span className="relative pipe-cursor">
        <AlreadyTypedWord targetWord={alreadyTypedTargetChars} userWord={props.userWord} />
      </span>
      {
        incomingTargetChars.split('').map((char, index) => (
          <span key={index} className="text-gray-400">{char}</span>
        ))
      }
    </div>
  )
}

export default CurrentWord
