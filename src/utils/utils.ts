/**
 * Convert a dialog string into an array of letters with additional properties
 * @param dialog
 * @returns
 */
export function dialogToLetters(dialog: string): { letter: string; delay: string }[] {
  const letters: {
    letter: string;
    delay: string;
  }[] = [];
  for (let letterIndex = 0; letterIndex < dialog.length; letterIndex++) {
    const letter = dialog[letterIndex];

    const dif = Math.floor(Math.random() * 2);
    letters.push({
      letter,
      delay: '0.' + letterIndex + dif + 's',
    });
  }

  return letters;
}
