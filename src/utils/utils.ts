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

export const saveTemplateAsFile = (filename: string, dataObjToWrite: object) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
};
