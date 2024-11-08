import { type DetailedHTMLProps, type TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  "aria-invalid"
> & {
  isInvalid?: boolean;
};

export function Textarea({ className, isInvalid, ...props }: Props) {
  return (
    <textarea
      aria-invalid={isInvalid ? true : undefined}
      className={twMerge(
        "textarea textarea-bordered resize-none focus:textarea-secondary aria-[invalid]:textarea-error",
        className,
      )}
      {...props}
    />
  );
}
