// import Link from "next/link";

import { LatestLetters } from "#/app/_components/letter/LatestLetters";
import { auth } from "#/server/auth";
import { api, HydrateClient } from "#/trpc/server";
import { type Viewport } from "next";
import { CreateLetter } from "./_components/letter/CreateLetter";
import { MobileBar } from "./_components/navigation/MobileBar";
import { SideBar } from "./_components/navigation/SideBar";

//  For mobile bttom navigation
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default async function Home() {
  const session = await auth();

  void api.letter.getLatestLetters.prefetch();

  return (
    <HydrateClient>
      <main className="relative grid min-h-screen grid-flow-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="col-span-1 my-auto hidden w-full max-w-xs md:block">
          <SideBar />
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Carta <span className="text-[hsl(280,100%,70%)]">secreta</span>
          </h1>
          <CreateLetter />
          <LatestLetters />
        </div>
        <div className="col-span-1 hidden md:block"></div>
      </main>
      <MobileBar />
    </HydrateClient>
  );
}
