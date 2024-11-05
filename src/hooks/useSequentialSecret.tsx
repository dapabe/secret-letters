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
        setChunks(x=> [...x, <span key={i} aria-label={`Este caracter es secreto: ${char}`} className="highlighted">{char}</span>]) 
        exhaustIndex = indexes[i]!
      } else {
        // setChunks(x=> [...x, char])
        // TODO: Join chunks into sentences, splice chunks and join chars
        setChunks(prev=> {          
          const aux = new Map<number,ReactNode>()
          for (let x = prev.length - 1; x >= prev.length; --x) { 
            const chunk = prev[x]
            if(typeof chunk !== "string") aux.set(i,chunk)
            else {
              
            }
          }
          console.log(aux)
          return [...prev, char]
        })
      }
    }

    return () => {
      setChunks([])
    }
  },[content,indexes])

  return chunks
}