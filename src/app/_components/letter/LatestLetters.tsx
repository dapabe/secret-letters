"use client";

import { api } from "#/trpc/react";
import { Letter } from "./Letter";

export function LatestLetters() {
  const [latestPost] = api.letter.getLatestLetters.useSuspenseQuery();


  return (
    <section className="w-full max-w-xs space-y-4">
        {latestPost?.map((letter) => {
          return <Letter key={letter.id} {...letter} />;
        })}

    </section>
  );
}
