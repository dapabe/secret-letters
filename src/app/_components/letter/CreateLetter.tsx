"use client";
import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { type ILetterCreate } from "#/server/db/models";
import { useLetterStore } from "#/stores/letter.store";
import { api } from "#/trpc/react";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPencilPlus,
  IconSend2,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "../forms/Textarea";
import { Tabs } from "../ui/Tabs";
import { LetterPreview } from "./LetterPreview";

const defState: ILetterCreate = {
  content: "",
  secrets: [],
};

export function CreateLetter() {
  const { isModalOpen, toggleModal } = useLetterStore();
  const utils = api.useUtils();
  const [letter, setLetter] = useState<ILetterCreate>(defState);
  const createLetter = api.letter.createLetter.useMutation({
    onSuccess: async () => {
      await utils.letter.invalidate();
      setLetter(defState);
    },
  });

  const contentRef = useRef<HTMLTextAreaElement>(null);

  //  Actions performed on modal open & close
  useEffect(() => {
    if (isModalOpen) contentRef.current?.focus();
    return () => {
      setLetter(defState);
    };
  }, [isModalOpen]);

  return (
    <dialog className="modal modal-bottom" open={isModalOpen}>
      <div className="absolute inset-x-0 inset-y-auto mx-auto max-w-4xl p-4">
        <LetterPreview secrets={letter.secrets} content={letter.content} />
      </div>
      <div className="modal-box mx-auto w-11/12 max-w-4xl space-y-4 overflow-visible">
        <div className="flex gap-x-4">
          <button
            type="submit"
            disabled={createLetter.isPending}
            className="btn btn-outline btn-primary h-fit flex-1 py-2"
            onClick={() => createLetter.mutate(letter)}
          >
            <IconSend2 className="size-6" />
            Crear mensaje secreto
          </button>
          <form method="dialog" className="size-fit">
            <button className="btn btn-circle" onClick={toggleModal}>
              <IconX className="size-6" />
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Tabs
            className="col-span-3 row-span-4"
            tabs={[
              {
                title: "Contenido",
                body: (
                  <Textarea
                    ref={contentRef}
                    placeholder="Contenido de la carta"
                    className="size-full"
                    value={letter.content}
                    onChange={(e) =>
                      setLetter({ ...letter, content: e.target.value })
                    }
                    onPointerEnter={() => {
                      contentRef.current?.scrollIntoView(false);
                    }}
                    // onFocus={(e) => window.scrollTo({top: document.body.offsetHeight + e.target.offsetTop})}
                  />
                ),
              },
              {
                title: "Notas secretas",
                body: <SecretPhraseTable />,
              },
            ]}
          />
        </div>
      </div>
      <button
        onClick={toggleModal}
        className="modal-backdrop bg-neutral/80"
      ></button>
    </dialog>
  );
}

function SecretPhraseTable() {
  const { secrets, deleteSecret, updateSecret, storeSecret } = useLetterStore();
  const [isTextView, toggleView] = useImplicitToggle();
  const [currentText, setText] = useState("");

  return (
    <div className="w-full">
      {isTextView ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            storeSecret(currentText);
            setText("");
          }}
          className="grid grid-cols-4 grid-rows-2 gap-2"
        >
          <button className="btn" onClick={toggleView}>
            <IconArrowLeft />
            Volver
          </button>
          <button type="submit" className="btn btn-secondary row-start-2">
            <IconDeviceFloppy />
            Guardar
          </button>
          <Textarea
            placeholder="Mensaje secreto"
            value={currentText}
            className="col-span-full col-start-2 row-span-2"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <td className="w-full">
                <button
                  className="btn btn-outline btn-sm w-full"
                  onClick={toggleView}
                >
                  <IconPencilPlus />
                  Añadir secreto
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {secrets.map((s, i) => (
              <tr key={i}>
                <th>
                  <button
                    className="btn btn-square btn-error btn-sm"
                    onClick={() => deleteSecret(i)}
                  >
                    <IconTrash />
                  </button>
                </th>
                <td colSpan={-1}>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
