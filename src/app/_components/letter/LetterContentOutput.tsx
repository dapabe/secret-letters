import { type ILetterRead, type ISecretRead } from "#/server/db/models";
import { TransformSecretChunks } from "./TransformSecretChunks";

type Props = {
  content: ILetterRead["content"];
  secret: ISecretRead["text"] | null;
  isRevealed: boolean;
};

export function LetterContentOutput({ content, isRevealed, secret }: Props) {
  if (!secret) return content;
  return (
    <TransformSecretChunks
      secret={secret}
      content={content}
      isRevealed={isRevealed}
    />
  );
}
