import { processWord } from "$lib/process"
import React from "react"

interface AlreadyTypedWordProps {
  targetWord: string
  userWord: string
}

function AlreadyTypedWord(props: AlreadyTypedWordProps) {
  const charMatchs = processWord(props.targetWord, props.userWord)

  return (
    <span>
      {
        charMatchs.map((charMatch, index) => {
          if (charMatch.status == "CORRECT") return <span key={index} className="text-gray-200">{charMatch.char}</span>
          if (charMatch.status == "INCORRECT") return <span key={index} className="text-red-700">{charMatch.char}</span>
          if (charMatch.status == "MISSED") return <span key={index} className="text-gray-600">{charMatch.char}</span>
          if (charMatch.status == "OVERTYPED") return <span key={index} className="text-red-800">{charMatch.char}</span>
        })
      }
    </span>
  )
}

export default AlreadyTypedWord
