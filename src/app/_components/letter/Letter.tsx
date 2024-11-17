import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { type ILetterRead } from "#/server/db/models";
import { useState } from "react";
import { LetterBackground } from "./LetterBackground";
import { LetterContentOutput } from "./LetterContentOutput";
import { LetterFooter } from "./LetterFooter";

export function Letter({ Secrets, content }: ILetterRead) {
  const [isRevealed, toggleReveal] = useImplicitToggle();
  const [currentSecret, setCurrentSecret] = useState(0);

  const handlePrevSecret = () =>
    setCurrentSecret((x) => {
      if (x === 0) return Secrets.length - 1;
      return x - 1;
    });
  const handleNextSecret = () =>
    setCurrentSecret((x) => {
      if (x === Secrets.length - 1) return 0;
      return x + 1;
    });

  return (
    <LetterBackground>
      <main className="bg-base-100 p-4 pt-6 font-mono">
        <section className="text-sm">
          <LetterContentOutput
            content={content}
            secret={Secrets[currentSecret]?.text ?? null}
            isRevealed={isRevealed}
          />
        </section>
        <div className="divider my-0"></div>
        <LetterFooter
          Secrets={Secrets}
          currentSecret={currentSecret}
          handlePrevSecret={handlePrevSecret}
          handleNextSecret={handleNextSecret}
          isRevealed={isRevealed}
          toggleReveal={toggleReveal}
          hasBookmark={false}
        />
      </main>
    </LetterBackground>
  );
}
