import { type ILetterRead } from "#/server/db/models";
import {
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

type Props =
  | {
      isPreview: boolean;
      Secrets: ILetterRead["Secrets"];

      isRevealed: boolean;
      hasBookmark?: boolean;
      toggleReveal: () => void;

      currentSecret: number;
      handlePrevSecret: () => void;
      handleNextSecret: () => void;
    }
  | {
      isPreview?: false;
      Secrets: ILetterRead["Secrets"];

      isRevealed: boolean;
      hasBookmark: boolean;
      toggleReveal: () => void;

      currentSecret: number;
      handlePrevSecret: () => void;
      handleNextSecret: () => void;
    };

export function LetterFooter({
  Secrets,
  currentSecret,
  isRevealed,
  hasBookmark,
  toggleReveal,
  isPreview,
  handleNextSecret,
  handlePrevSecret,
}: Props) {
  const session = useSession();
  const router = useRouter();

  if (isPreview)
    return (
      <footer className="flex items-center justify-around">
        <button className="btn btn-outline btn-sm" onClick={toggleReveal}>
          {isRevealed ? (
            <>
              <IconEye />
              Ocultar secreto
            </>
          ) : (
            <>
              <IconEyeClosed />
              Mostrar secreto
            </>
          )}
        </button>
        <SecretNavigation
          currentSecret={currentSecret}
          handlePrevSecret={handlePrevSecret}
          handleNextSecret={handleNextSecret}
          totalSecrets={Secrets.length}
        />
      </footer>
    );

  const handleBookmark = () => {
    if (!session.data) return router.push("/login");
    // api.letter.bookmarkLetter.mutate({
    //   letterId: currentLetter.id,
    //   bookmark: !currentLetter.bookmarked,
    // });
  };

  return (
    <footer className="flex items-center justify-between">
      {Secrets.length ? (
        <>
          <button
            className="btn btn-ghost btn-sm sm:tooltip sm:tooltip-left sm:tooltip-info"
            data-tip={isRevealed ? "Ocultar secreto" : "Mostrar secreto"}
            aria-label={isRevealed ? "Ocultar secreto" : "Mostrar secreto"}
            onClick={toggleReveal}
          >
            {isRevealed ? <IconEye /> : <IconEyeClosed />}
          </button>

          <SecretNavigation
            currentSecret={currentSecret}
            handlePrevSecret={handlePrevSecret}
            handleNextSecret={handleNextSecret}
            totalSecrets={Secrets.length}
          />
        </>
      ) : (
        <div className="flex-1"></div>
      )}
      <button
        className={
          "btn btn-ghost btn-sm text-base-300 hover:btn-link sm:tooltip sm:tooltip-right sm:tooltip-info"
        }
        data-tip={hasBookmark ? "Quitar nota marcada" : "Guardar nota"}
        aria-label={hasBookmark ? "Quitar nota marcada" : "Guardar nota"}
        onClick={handleBookmark}
      >
        <IconBookmark className={twJoin(hasBookmark && "fill-primary")} />
      </button>
    </footer>
  );
}

type CurrentSecretProps = {
  currentSecret: number;
  totalSecrets: number;
  handlePrevSecret: () => void;
  handleNextSecret: () => void;
};

function SecretNavigation({
  currentSecret,
  handlePrevSecret,
  handleNextSecret,
  totalSecrets,
}: CurrentSecretProps) {
  return (
    <div className="text-xs">
      <p className="text-center">Secretos</p>
      <div className="menu menu-horizontal mx-auto w-full items-center justify-center gap-x-1 p-0">
        <button
          disabled={totalSecrets <= 1}
          className="btn btn-square btn-xs"
          onClick={handlePrevSecret}
        >
          <IconChevronLeft />
        </button>

        <span className="text-xs leading-loose">
          {totalSecrets === 0 ? 0 : currentSecret + 1}/{totalSecrets}
        </span>
        <button
          disabled={totalSecrets <= 1}
          className="btn btn-square btn-xs"
          onClick={handleNextSecret}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
