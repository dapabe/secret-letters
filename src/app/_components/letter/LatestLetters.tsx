"use client";

import { api } from "#/trpc/react";
import { Letter } from "./Letter";

export function LatestLetters() {
  const [latestPosts] = api.letter.getLatestLetters.useSuspenseQuery();

  return (
    <section className="w-full max-w-xs space-y-4">
      {latestPosts.map((letter) => {
        return <Letter key={letter.id} {...letter} />;
      })}
    </section>
  );
}
