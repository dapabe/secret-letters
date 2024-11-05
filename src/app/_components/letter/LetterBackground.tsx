import { PropsWithChildren } from "react"



export const LetterBackground = ({children}:PropsWithChildren) => {
  return (
    <article className='w-full bg-white p-4 pt-6 shadow-md'
     style={{
      boxShadow: "4px 4px 0 #00486B",
      backgroundRepeat: "space no-repeat",
      backgroundPosition: "center top, center 1em, center 1em",
      backgroundImage: "linear-gradient(90deg, #fff 12px, 0, #00486B 15px, 0 ,#1373A9 20px, 0,#fff 100%),radial-gradient(circle closest-side,rgba(255,255,255,0) 88%,#fff 100%),radial-gradient(circle at 22px 8px,#1373A9 40%,#00486B 40%,#00486B 100%)",
      backgroundSize: "2em 1.3215em"
     }}
     >
      {children}
    </article>
  )
}
