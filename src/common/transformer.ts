/**
 *  1. La cadena de texto secreta debe esta incluida en el parrafo escrito y formateado bien.
 *  2. La cadena de texto final debe respetar el orden escrito
 *  3. El output debe tomar en cuenta
 */


export function formatSecret(secret: string, input: string) {

  const tsecret = secret
    .toLowerCase()
    .normalize("NFD") // decompose characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .split("")
    .filter((char) => char !== " ");


  // erase EoL
  const tinput = input.replace(/\n/g, "").split("");
  let secretIndex = 0; // sequencial index tracking
  const charTracker: number[] = []

  for (let x = 0; x < tinput.length; ++x) {
    if (secretIndex >= tsecret.length) break;
    //  @ts-expect-error - might be undefined
    const ich = tinput[x]
      .toLowerCase()
      .normalize("NFD") // decompose characters
      .replace(/[\u0300-\u036f]/g, ""); // remove diacritics

    // Only compare with current character in secret
    if (ich === tsecret[secretIndex]) {
      // tinput[x] = `(${tinput[x]})`;
      charTracker.push(x)
      secretIndex++; // Move to next character in secret
    }
  }
  return charTracker
}
