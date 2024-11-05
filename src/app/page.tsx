// import Link from "next/link";

import { LatestLetters } from "#/app/_components/letter/LatestLetters";
import { auth } from "#/server/auth";
import { api, HydrateClient } from "#/trpc/server";
import { type Viewport } from "next";
import { CreateLetter } from "./_components/letter/CreateLetter";
import { MobileBar } from "./_components/navigation/MobileBar";

//  For mobile bttom navigation
export const viewport: Viewport = {
  viewportFit: "cover",
}

export default async function Home() {
  const session = await auth();

  void api.letter.getLatestLetters.prefetch();
  

  return (
    <HydrateClient>
      <div data-theme="fantasy">
        <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-white">
              Carta <span className="text-[hsl(280,100%,70%)]">secreta</span>
            </h1>
            <CreateLetter/>
            <LatestLetters />
          </div>
        </main>
        <MobileBar/>
      </div>
    </HydrateClient>
  );
}
