import { type ILetterRead } from "#/server/db/models";
import {
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";

type Props = {
  Secrets: ILetterRead["Secrets"];

  isRevealed: boolean;
  toggleReveal: () => void;

  currentSecret: number;
  handlePrevSecret: () => void;
  handleNextSecret: () => void;

  isPreview?: boolean;
};

export function LetterFooter({
  Secrets,
  currentSecret,
  isRevealed,
  toggleReveal,
  isPreview,
  handleNextSecret,
  handlePrevSecret,
}: Props) {
  if (isPreview)
    return (
      <footer className="flex items-center">
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

  return (
    <footer className="flex items-center">
      {Secrets.length ? (
        <>
          <button
            className="btn btn-ghost btn-sm sm:tooltip sm:tooltip-left sm:tooltip-info"
            data-tip={isRevealed ? "Ocultar secreto" : "Mostrar secreto"}
            onClick={toggleReveal}
            aria-label={isRevealed ? "Ocultar secreto" : "Mostrar secreto"}
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
      <button className="btn btn-link btn-sm">
        <IconBookmark />
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
    <div className="flex-1 text-xs">
      <p className="text-center">Secretos</p>
      <div className="menu menu-horizontal mx-auto w-full items-center justify-center gap-x-1 p-0">
        <button
          disabled={currentSecret <= 0}
          className="btn btn-square btn-xs tooltip tooltip-left"
          data-tip="Secreto anterior"
          onClick={handlePrevSecret}
        >
          <IconChevronLeft />
        </button>

        <span className="text-xs leading-loose">
          {totalSecrets === 0 ? 0 : currentSecret + 1}/{totalSecrets}
        </span>
        <button
          disabled={currentSecret + 1 >= totalSecrets}
          className="btn btn-square btn-xs tooltip tooltip-right"
          data-tip="Siguiente secreto"
          onClick={handleNextSecret}
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
