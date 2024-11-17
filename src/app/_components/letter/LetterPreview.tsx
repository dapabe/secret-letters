"use client";

import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { type ILetterCreate } from "#/server/db/models";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LetterBackground } from "./LetterBackground";
import { LetterContentOutput } from "./LetterContentOutput";
import { LetterFooter } from "./LetterFooter";

export function LetterPreview() {
  const [isRevealed, toggleReveal] = useImplicitToggle(true);
  const [currentSecret, setCurrentSecret] = useState(0);

  const form = useFormContext<ILetterCreate>();

  const secrets = form
    .watch("secrets")
    .map((s, i) => ({ ...s, id: i.toString() }));
  const content = form.watch("content");

  const handlePrevSecret = () =>
    setCurrentSecret((x) => {
      if (x === 0) return secrets.length - 1;
      return x - 1;
    });
  const handleNextSecret = () =>
    setCurrentSecret((x) => {
      if (x === secrets.length - 1) return 0;
      return x + 1;
    });

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
