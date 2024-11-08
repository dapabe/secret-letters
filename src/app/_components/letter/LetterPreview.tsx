"use client";

import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { type ILetterCreate } from "#/server/db/models";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { twJoin } from "tailwind-merge";
import { LetterBackground } from "./LetterBackground";

type Props = {
  secrets: ILetterCreate["secrets"];
  content: string;
  isEyeOpen?: boolean;
};

export function LetterPreview({ secrets, content, isEyeOpen }: Props) {
  const chunks = useSequentialSecret(secrets[0]?.text ?? "", content);
  const [isRevealed, toggleReveal] = useImplicitToggle(!!isEyeOpen);

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
          Vista previa
        </button>
      </main>
    </LetterBackground>
  );
}
