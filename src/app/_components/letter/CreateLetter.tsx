"use client";
import { LetterCreateSchema, type ILetterCreate } from "#/server/db/models";
import { useLetterStore } from "#/stores/letter.store";
import { api } from "#/trpc/react";
import {
  IconPencilMinus,
  IconPencilPlus,
  IconPencilQuestion,
  IconSend2,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "../forms/Textarea";
import { LetterPreview } from "./LetterPreview";

export function CreateLetter() {
  const { isModalOpen, toggleModal } = useLetterStore();

  const utils = api.useUtils();
  const [letter, setLetter] = useState<ILetterCreate>(
    LetterCreateSchema.parse({}),
  );
  const createLetter = api.letter.createLetter.useMutation({
    onSuccess: async () => {
      await utils.letter.invalidate();
      setLetter(LetterCreateSchema.parse({}));
    },
  });

  const contentRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (contentRef.current?.hidden) contentRef.current.focus();
  // }, [contentRef.current?.hidden]);

  //  Actions performed on modal open & close
  useEffect(() => {
    if (isModalOpen) contentRef.current?.focus();
    return () => {
      setLetter(LetterCreateSchema.parse({}));
    };
  }, [isModalOpen]);

  return (
    <dialog className="modal modal-bottom" open={isModalOpen}>
      <div className="absolute inset-x-0 inset-y-auto mx-auto max-w-4xl p-4">
        <LetterPreview
          secrets={[letter.secretParagraph]}
          content={letter.letterContent}
        />
      </div>
      <div className="modal-box mx-auto w-11/12 max-w-4xl space-y-1 overflow-visible">
        <SecretStack />
        <form method="dialog" className="ml-auto size-fit">
          <button className="btn btn-circle" onClick={toggleModal}>
            <IconX className="size-6" />
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createLetter.mutate(letter);
          }}
          className="grid grid-cols-3 grid-rows-4 gap-4"
        >
          {/* <textarea
            placeholder="Frase secreta"
            className="textarea textarea-bordered resize-none"
            value={letter.secretParagraph}
            onChange={(e) => setLetter({ ...letter, secretParagraph: e.target.value })}
          /> */}
          <Textarea
            ref={contentRef}
            placeholder="Contenido de la carta"
            className="col-span-2 row-span-4"
            value={letter.letterContent}
            onChange={(e) =>
              setLetter({ ...letter, letterContent: e.target.value })
            }
            // onFocus={(e) => window.scrollTo({top: document.body.offsetHeight + e.target.offsetTop})}
          />
          <button
            type="submit"
            disabled={!!createLetter.error}
            className="btn btn-outline btn-primary col-start-3 row-span-2 row-start-3 h-fit w-full py-2"
          >
            <IconSend2 className="size-6" />
            Enviar mensaje secreto
          </button>
        </form>
      </div>
      <button
        onClick={toggleModal}
        className="modal-backdrop bg-neutral/80"
      ></button>
    </dialog>
  );
}

function SecretStack() {
  const { secrets } = useLetterStore();
  return (
    <div className="card absolute -top-6 left-2 bg-base-100 shadow-md">
      <div className="card-body px-3 py-2">
        <div className="text-center">
          <p className="text-lg font-bold">Nuevo mensaje secreto</p>
        </div>
      </div>
      <div className="join">
        <button className="btn btn-secondary join-item btn-sm flex-1 rounded-t-none">
          <IconPencilPlus className="size-5" />
        </button>
        <button
          disabled={!secrets.length}
          className="btn btn-secondary join-item btn-sm flex-1 rounded-t-none"
        >
          <IconPencilQuestion className="size-5" />
        </button>
        <button
          disabled={!secrets.length}
          className="btn btn-secondary join-item btn-sm flex-1 rounded-t-none"
        >
          <IconPencilMinus className="size-5" />
        </button>
      </div>
    </div>
  );
}
