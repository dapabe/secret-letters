import { useCallback, useState } from "react";

/**
 *  Starts with `false` \
 *  Returns a `boolean` and a callback toggling it.
 *  @returns [isValid, toggleValid]
 */
export function useImplicitToggle(bool = false): [boolean, () => void] {
  const [b, s] = useState(Boolean(bool));

  const toggle = useCallback(() => s((x) => !x), []);
  return [b, toggle];
}