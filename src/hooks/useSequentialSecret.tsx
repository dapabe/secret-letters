import { formatSecret } from "#/common/transformer"
import { type ReactNode, useEffect, useMemo, useState } from "react"


/**
 *  Takes secret phrases and format them into a sequential array of characters \n
 *  and JSX elements.
 */
export function useSequentialSecret(secret: string, content: string) {
  const indexes = useMemo(() => formatSecret(secret,content), [secret,content])  
  const [chunks, setChunks] = useState<ReactNode[]>([])

  useEffect(()=>{
   
    let exhaustIndex = 0
    const last = indexes.at(-1)

    for (let i = 0; i < content.length; ++i) { 
      const char = content[i]

      if(last === exhaustIndex) {
        setChunks(x=> [...x,char])
        continue
      }
  
      if(indexes.includes(i)){
        setChunks(x=> [...x, <span key={i} className="text-red-500">{char}</span>]) 
        exhaustIndex = indexes[i]!
      } else {
        // if(i && typeof chunks[i - 1] === "string") setChunks(x=> [...x, x.concat(char).join("")])
        setChunks(x=> [...x,char])
      }
    }

    return () => {
      setChunks([])
    }
  },[content,indexes])

  return chunks
}