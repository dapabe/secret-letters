"use client";

import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { type ILetterRead } from "#/server/db/models";
import { useState } from "react";
import { LetterBackground } from "./LetterBackground";
import { LetterContentOutput } from "./LetterContentOutput";
import { LetterFooter } from "./LetterFooter";

type Props = {
  secrets: ILetterRead["Secrets"];
  content: string;
};

export function LetterPreview({ secrets, content }: Props) {
  const [isRevealed, toggleReveal] = useImplicitToggle(true);
  const [currentSecret, setCurrentSecret] = useState(0);

  const handlePrevSecret = () => setCurrentSecret((x) => x - 1);
  const handleNextSecret = () => setCurrentSecret((x) => x + 1);

  // useEffect(() => {
  //   if (currentSecret === 0 && secrets.length > 0) handleNextSecret();
  //   if (currentSecret >= secrets.length) handlePrevSecret();
  // }, [currentSecret, secrets]);

  return (
    <LetterBackground>
      <main className="bg-base-100 p-4 pt-6 font-mono">
        <h2 className="text-center">Vista previa</h2>
        <section className="text-sm">
          <LetterContentOutput
            content={content}
            secret={secrets[currentSecret]?.text ?? null}
            isRevealed={isRevealed}
          />
        </section>
        <div className="divider m-0"></div>
        <LetterFooter
          Secrets={secrets}
          currentSecret={currentSecret}
          handlePrevSecret={handlePrevSecret}
          handleNextSecret={handleNextSecret}
          isRevealed={isRevealed}
          toggleReveal={toggleReveal}
          isPreview
        />
      </main>
    </LetterBackground>
  );
}
