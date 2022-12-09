export async function solution(input: string): Promise<string> {
  const lastFourChars: [number, string][] = [];
  let index = -1;
  for (let i = 0; i < input.length; i++) {
    const c: [number, string] = [i, input[i]];
    lastFourChars.push(c);
    if (lastFourChars.length > 14) {
      lastFourChars.shift();

      let duplicateFound = false;
      for (let j = 0; j < lastFourChars.length; j++) {
        const copy = [...lastFourChars];
        const char = lastFourChars[j][1];
        copy.splice(j, 1);
        if (copy.find((v) => v[1] === char)) {
          // Duplicate found!
          duplicateFound = true;
        } else {
          index = i;
        }
      }
      if (!duplicateFound) break;
    }
  }

  return (index + 1).toString();
}
