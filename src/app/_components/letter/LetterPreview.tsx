"use client";

import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { twJoin } from "tailwind-merge";
import { LetterBackground } from "./LetterBackground";

type Props = {
  secrets: string[];
  content: string;
};

export function LetterPreview({ secrets, content }: Props) {
  const chunks = useSequentialSecret(secrets?.[0] ?? "", content);
  const [isRevealed, toggleReveal] = useImplicitToggle();

  return (
    <LetterBackground>
      <main className="bg-base-100 p-4 pt-6">
        <p
          className={twJoin(
            "transition-colors",
            isRevealed
              ? "text-base-300 [&_.highlighted]:text-accent"
              : undefined,
          )}
        >
          {chunks}
        </p>
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleReveal}
          aria-label={isRevealed ? "Ocultar" : "Mostrar"}
        >
          {isRevealed ? <IconEye /> : <IconEyeClosed />}
        </button>
      </main>
    </LetterBackground>
  );
}
