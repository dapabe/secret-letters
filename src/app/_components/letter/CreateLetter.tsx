"use client";
import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import { SecretCreateSchema, type ILetterCreate } from "#/server/db/models";
import { useLetterStore } from "#/stores/letter.store";
import { api } from "#/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPencilPlus,
  IconPencilQuestion,
  IconSend2,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
    // if (isModalOpen) contentRef.current?.focus();
    return () => {
      setLetter(defState);
    };
  }, [isModalOpen]);

  const handleUpdateSecret = (i: number, text: string) => {
    setLetter({
      ...letter,
      secrets: letter.secrets.map((s, idx) => (i === idx ? { text } : s)),
    });
  };

  const handleDeleteSecret = (i: number) => {
    setLetter({
      ...letter,
      secrets: letter.secrets.filter((_, idx) => idx !== i),
    });
  };

  const handleStoreSecret = (text: string) => {
    setLetter({
      ...letter,
      secrets: [...letter.secrets, { text }],
    });
  };

  return (
    <dialog
      className="modal modal-bottom flex flex-col justify-between"
      open={isModalOpen}
    >
      <div className="mx-auto w-11/12 max-w-4xl pt-4">
        <LetterPreview
          secrets={letter.secrets}
          content={letter.content}
          isEyeOpen
        />
      </div>
      <div className="modal-box bottom-0 mx-auto w-11/12 max-w-4xl space-y-4">
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
                    // onPointerEnter={() => {
                    //   contentRef.current?.scrollIntoView(false);
                    // }}
                    // onFocus={(e) => window.scrollTo({top: document.body.offsetHeight + e.target.offsetTop})}
                  />
                ),
              },
              {
                title: `Notas secretas ${letter.secrets.length ? `(${letter.secrets.length})` : ""}`,
                body: (
                  <SecretPhraseTable
                    secrets={letter.secrets}
                    storeSecret={handleStoreSecret}
                    updateSecret={handleUpdateSecret}
                    deleteSecret={handleDeleteSecret}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
      <button
        onClick={toggleModal}
        className="modal-backdrop absolute inset-0 bg-neutral/80"
      ></button>
    </dialog>
  );
}

type PhrasesTableProps = {
  secrets: ILetterCreate["secrets"];
  deleteSecret: (index: number) => void;
  updateSecret: (index: number, text: string) => void;
  storeSecret: (text: string) => void;
};

const SecretPhraseSchema = SecretCreateSchema.pick({ text: true }).extend({
  index: z.number(),
});
type ISecretPhraseValue = z.infer<typeof SecretPhraseSchema>;

function SecretPhraseTable({
  secrets,
  deleteSecret,
  updateSecret,
  storeSecret,
}: PhrasesTableProps) {
  const [isTextView, toggleView] = useImplicitToggle();
  const [currentVal, setVal] = useState<ISecretPhraseValue>({
    text: "",
    index: -1,
  });

  return (
    <div className="w-full">
      {isTextView ? (
        <SecretPhraseForm
          values={{
            text: currentVal.text,
            index: currentVal.index,
          }}
          onSubmit={(x) => {
            console.log(x);
            if (x.index === -1) return storeSecret(x.text);
            updateSecret(x.index, x.text);
            setVal({ text: "", index: -1 });
          }}
          toggleView={toggleView}
        />
      ) : (
        <table className="table table-xs">
          <caption className="mb-2">
            <button
              className="btn btn-outline btn-sm w-full"
              onClick={toggleView}
            >
              <IconPencilPlus />
              Añadir secreto
            </button>
          </caption>
          <tbody>
            {secrets.map((s, i) => (
              <tr key={i}>
                <th className="flex gap-x-4">
                  <button
                    className="btn btn-square btn-error btn-sm"
                    onClick={() => deleteSecret(i)}
                  >
                    <IconTrash />
                  </button>
                  <button
                    className="btn btn-info btn-sm flex-1 justify-start"
                    onClick={() => {
                      toggleView();
                      setVal({ text: s.text, index: i });
                    }}
                  >
                    <IconPencilQuestion />
                    <span className="max-w-[15ch] truncate md:max-w-[60ch]">
                      {s.text}
                    </span>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

type SecretPhraseFormProps = {
  values: ISecretPhraseValue;
  onSubmit: (data: ISecretPhraseValue) => void;
  toggleView: () => void;
};

function SecretPhraseForm({
  onSubmit,
  toggleView,
  values,
}: SecretPhraseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISecretPhraseValue>({
    values,
    resolver: zodResolver(SecretPhraseSchema),
  });

  const handleOnSubmit = (v: ISecretPhraseValue) => {
    onSubmit(v);
    reset();
    if (v.index >= 0) {
      toggleView();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="grid grid-cols-4 grid-rows-2 gap-2"
    >
      <button className="btn" onClick={toggleView}>
        <IconArrowLeft />
        <span className="hidden md:inline">Volver</span>
      </button>
      <button type="submit" className="btn btn-secondary row-start-2">
        <IconDeviceFloppy />
        <span className="hidden md:inline">Guardar</span>
      </button>
      <Textarea
        placeholder="Mensaje secreto"
        isInvalid={!!errors.text}
        className="col-span-full col-start-2 row-span-2"
        {...register("text")}
      />
      <input type="number" {...register("index")} className="hidden" />
    </form>
  );
}
