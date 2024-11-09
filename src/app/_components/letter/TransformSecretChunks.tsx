import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { type ILetterRead, type ISecretRead } from "#/server/db/models";
import { twJoin } from "tailwind-merge";

type Props = {
  content: ILetterRead["content"];
  secret: ISecretRead["text"];
  isRevealed: boolean;
};

export function TransformSecretChunks({ content, secret, isRevealed }: Props) {
  const chunks = useSequentialSecret(secret, content);

  return (
    <div
      className={twJoin(
        "transition-colors",
        isRevealed ? "text-base-300 [&_.highlighted]:text-accent" : undefined,
      )}
    >
      {chunks}
    </div>
  );
}
