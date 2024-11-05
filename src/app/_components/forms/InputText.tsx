import { type DetailedHTMLProps, type InputHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"


type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,"aria-invalid"> & {
  isInvalid?: boolean
}

export function InputText({className, isInvalid, ...props}:Props) {


  return <input
    aria-invalid={isInvalid}
    className={twMerge("input input-bordered focus:input-secondary aria-[invalid]:input-error", className)}
    {...props}
  />
}