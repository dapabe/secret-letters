import { formatSecret } from "#/common/transformer";
import { type ReactNode, useEffect, useMemo, useState } from "react";

/**
 * Takes secret phrases and formats them into a sequential array of characters
 * and JSX elements, concatenating regular characters between highlighted spans.
 */
export function useSequentialSecret(secret: string, content: string) {
  const indexes = useMemo(
    () => formatSecret(secret, content),
    [secret, content],
  );
  const [chunks, setChunks] = useState<ReactNode[]>([]);

  useEffect(() => {
    let currentString = "";
    const newChunks: ReactNode[] = [];

    // Process each character in the content
    for (let i = 0; i < content.length; i++) {
      const char = content[i];

      if (indexes.includes(i)) {
        // If we have accumulated characters, push them as a chunk
        if (currentString) {
          newChunks.push(currentString);
          currentString = "";
        }

        // Add the highlighted span
        newChunks.push(
          <span key={i} tabIndex={0}>
            {char}
          </span>,
        );
      } else {
        // Accumulate regular characters
        currentString += char;
      }
    }

    // Push any remaining characters
    if (currentString) {
      newChunks.push(currentString);
    }

    setChunks(newChunks);

    // Cleanup function
    return () => {
      setChunks([]);
    };
  }, [content, indexes]);

  return chunks;
}
