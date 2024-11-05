"use client";
import { LetterCreateSchema, type ILetterCreate } from "#/server/db/models";
import { useLetterStore } from "#/stores/letter.store";
import { api } from "#/trpc/react";
import { MinusIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "../forms/Textarea";


export function CreateLetter() {
  const {isModalOpen, toggleModal} = useLetterStore()

  const utils = api.useUtils()
  const [letter, setLetter] = useState<ILetterCreate>(LetterCreateSchema.parse({}));
  const createLetter = api.letter.createLetter.useMutation({
    onSuccess: async () => {
      await utils.letter.invalidate();
      setLetter(LetterCreateSchema.parse({}))
    },
  })

  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(()=>{
   if(contentRef.current?.hidden) contentRef.current.focus()
  },[contentRef.current?.hidden])


  return (
    <dialog className="modal modal-bottom " open={isModalOpen}>
      <div className="modal-box w-11/12 max-w-4xl mx-auto space-y-1 overflow-visible">
      <SecretStack/>
        <form method="dialog" className="size-fit ml-auto">
          <button className="btn btn-circle" onClick={toggleModal}><XMarkIcon className="size-6"/></button>
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
            onChange={(e) => setLetter({ ...letter, letterContent: e.target.value })}
            onFocus={(e) => window.scrollTo({top: document.body.offsetHeight + e.target.offsetTop})}
          />
          <button
            type="submit"
            className="row-start-3 row-span-2 col-start-3 btn btn-outline btn-primary w-full h-fit py-2"
          >
            <PaperAirplaneIcon className="size-6"/>
            Enviar mensaje secreto
          </button>
        </form>
      </div>
      <button onClick={toggleModal} className="modal-backdrop bg-neutral/80"></button>
    </dialog>
  );
}


function SecretStack(){
  const { secrets } = useLetterStore()
  return (
    <div className="card bg-base-100 shadow-md absolute left-2 -top-6">
      <div className="card-body px-3 py-2">
        <div className="text-center">
          <p className="text-lg font-bold">
            Nuevo mensaje secreto
          </p>
        </div>
      </div>
      <div className="join">
        <button className="join-item flex-1 btn btn-sm btn-secondary rounded-t-none"><PlusIcon className="size-5"/></button>   
        <button disabled={!secrets.length} className="join-item flex-1 btn btn-sm btn-secondary rounded-t-none"><PencilSquareIcon className="size-5"/></button>             
        <button disabled={!secrets.length} className="join-item flex-1 btn btn-sm btn-secondary rounded-t-none"><MinusIcon className="size-5"/></button>   
      </div>
    </div>
  )
}