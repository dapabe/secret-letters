import { useSequentialSecret } from "#/hooks/useSequentialSecret";
import { type ILetterRead, type ISecretRead } from "#/server/db/models";

type Props = {
  content: ILetterRead["content"];
  secret: ISecretRead["text"];
  isRevealed: boolean;
};

export function TransformSecretChunks({ content, secret, isRevealed }: Props) {
  const chunks = useSequentialSecret(secret, content);

  return (
    <div
      data-revealed={`${isRevealed}`}
      data-highlight={isRevealed && "default"}
      className="transition-colors"
    >
      {chunks}
    </div>
  );
}
