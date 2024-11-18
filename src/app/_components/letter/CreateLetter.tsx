"use client";
import { useImplicitToggle } from "#/hooks/useImplicitToggle";
import {
  LetterCreateSchema,
  SecretCreateSchema,
  type ILetterCreate,
} from "#/server/db/models";
import { useModalStore } from "#/stores/modal.store";
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
import { useEffect } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../forms/Textarea";
import { Tabs } from "../ui/Tabs";
import { LetterPreview } from "./LetterPreview";

export function CreateLetter() {
  const { createLetterModal, toggleModal } = useModalStore();

  const utils = api.useUtils();
  const form = useForm<ILetterCreate>({
    values: {
      content: "",
      secrets: [],
    },
    resolver: zodResolver(LetterCreateSchema),
  });

  const createLetter = api.letter.createLetter.useMutation({
    onSuccess: async () => {
      await utils.letter.invalidate();
      form.reset();
    },
  });

  //  Actions performed on modal open & close
  useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form, createLetterModal]);

  // const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <FormProvider {...form}>
      <dialog
        // ref={dialogRef}
        className="modal modal-bottom flex flex-col justify-between"
        open={createLetterModal}
      >
        <div className="mx-auto w-11/12 max-w-4xl pt-4">
          <LetterPreview />
        </div>
        <div className="modal-box bottom-0 mx-auto w-11/12 max-w-4xl space-y-4">
          <div className="flex gap-x-4">
            <button
              type="submit"
              disabled={createLetter.isPending}
              className="btn btn-outline btn-primary h-fit flex-1 py-2"
              onClick={() => createLetter.mutate(form.getValues())}
            >
              <IconSend2 className="size-6" />
              Crear mensaje secreto
            </button>
            <form method="dialog" className="size-fit">
              <button
                className="btn btn-circle"
                onClick={() => toggleModal("createLetterModal")}
              >
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
                      placeholder="Contenido de la carta"
                      className="size-full"
                      {...form.register("content")}

                      //  sometimes works, sometimes not for some reason
                      // onFocus={(e) => {
                      //   if (isMobile) {
                      //     const targetTop =
                      //       e.target.getBoundingClientRect().top;
                      //     dialogRef.current?.scrollTo({
                      //       top: targetTop,
                      //       behavior: "smooth",
                      //     });
                      //   }
                      // }}
                    />
                  ),
                },
                {
                  title: `Notas secretas ${form.getValues("secrets").length ? `(${form.getValues("secrets").length})` : ""}`,
                  body: <SecretPhraseTable control={form.control} />,
                },
              ]}
            />
          </div>
        </div>
        <button
          onClick={() => toggleModal("createLetterModal")}
          className="modal-backdrop absolute inset-0 bg-neutral/80"
        ></button>
      </dialog>
    </FormProvider>
  );
}

const SecretPhraseSchema = SecretCreateSchema.pick({ text: true }).extend({
  index: z.number(),
});
type ISecretPhraseValue = z.infer<typeof SecretPhraseSchema>;

function SecretPhraseTable({ control }: { control: Control<ILetterCreate> }) {
  const [isTextView, toggleView] = useImplicitToggle();
  const { fields, append, remove, update } = useFieldArray<ILetterCreate>({
    control,
    name: "secrets",
  });

  const secretForm = useForm<ISecretPhraseValue>({
    values: {
      text: "",
      index: -1,
    },
    resolver: zodResolver(SecretCreateSchema),
  });

  return (
    <div className="w-full">
      {isTextView ? (
        <SecretPhraseForm
          values={secretForm.getValues()}
          onSubmit={(x) => {
            if (x.index === -1) return append({ text: x.text });
            update(x.index, { text: x.text });
          }}
          toggleView={toggleView}
        />
      ) : (
        <table className="table table-xs">
          <caption className="mb-2">
            <button
              className="btn btn-outline btn-sm w-full"
              onClick={() => {
                secretForm.reset();
                toggleView();
              }}
            >
              <IconPencilPlus />
              Añadir secreto
            </button>
          </caption>
          <tbody>
            {fields.map((field, i) => (
              <tr key={i}>
                <th className="flex gap-x-4">
                  <button
                    className="btn btn-square btn-error btn-sm"
                    onClick={() => remove(i)}
                  >
                    <IconTrash />
                  </button>
                  <button
                    className="btn btn-info btn-sm flex-1 justify-start"
                    onClick={() => {
                      toggleView();
                      secretForm.setValue("index", i);
                      secretForm.setValue("text", field.text);
                    }}
                  >
                    <IconPencilQuestion />
                    <span className="max-w-[15ch] truncate md:max-w-[60ch]">
                      {field.text}
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
    toggleView();
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
    </form>
  );
}
