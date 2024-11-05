import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { type ILetterRead } from "#/server/db/models";
import { LetterBackground } from "./LetterBackground";


export function Letter({id,OwnedBy,letterContent,secretParagraph,title}: ILetterRead) {

  const chunks = useSequentialSecret(secretParagraph,letterContent)

    
  
  
  return (
    <LetterBackground>
      <p>{chunks}</p>
    </LetterBackground>
  );
}