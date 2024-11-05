"use client"

import { useSequentialSecret } from "#/hooks/useSequentialSecret"
import { LetterBackground } from "./LetterBackground"

type Props = {
  secrets: string[]
  content: string
}

export function LetterPreview({secrets,content}: Props) {
  const chunks = useSequentialSecret(secrets?.[0]?? "",content)
  return (
    <LetterBackground>
      <p>{chunks}</p>
    </LetterBackground>
  )
}
