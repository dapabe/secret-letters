import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { type ILetterRead } from "#/server/db/models";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { twJoin } from "tailwind-merge";
import { LetterBackground } from "./LetterBackground";

export function Letter({ secrets, content }: ILetterRead) {
  const chunks = useSequentialSecret(secrets?.[0]?.text ?? "", content);
  const [isRevealed, toggleReveal] = useImplicitToggle();

  return (
    <LetterBackground>
      <main className="bg-base-100 p-4 pt-6">
        <section
          className={twJoin(
            "transition-colors",
            isRevealed
              ? "text-base-300 [&_.highlighted]:text-accent"
              : undefined,
          )}
        >
          {chunks}
        </section>
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
