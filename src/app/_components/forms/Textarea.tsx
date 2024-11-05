import { type DetailedHTMLProps, type TextareaHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,"aria-invalid"> & {
  isInvalid?: boolean
}

export function Textarea({className, isInvalid, ...props}:Props) {

  return <textarea 
    aria-invalid={isInvalid}
    className={twMerge("textarea textarea-bordered focus:textarea-secondary aria-[invalid]:textarea-error resize-none", className)}
    {...props}
  />
}