import { atom } from 'recoil';
import ISequence from '../interfaces/Sequence.interface';

export interface ILibraryState {
  sequences: ISequence[];
}

const rawSavedData = localStorage.getItem('library');
export const defaultLibrary: ILibraryState = {
  sequences: [
    {
      internalName: 'seq_test',
      items: [
        {
          type: 'dialog',
          data: {
            characterIndex: 1,
            emotionIndex: 2,
            text: 'Hello world',
            speed: 'normal',
            isScared: true,
          },
        },
        {
          type: 'dialog',
          data: {
            characterIndex: 0,
            emotionIndex: 0,
            text: 'Text test 2',
            speed: 'slow',
          },
        },
        {
          type: 'dialog',
          data: {
            characterIndex: 1,
            emotionIndex: 1,
            text: 'Blablablabla',
            speed: 'slow',
          },
        },
      ],
    },
  ],
};
let library: ILibraryState = { ...defaultLibrary };
if (rawSavedData) {
  library = JSON.parse(rawSavedData) as ILibraryState;
  console.log('LOADED FILE');
  console.log(library);
}
const libraryState = atom<ILibraryState>({
  key: 'library',
  default: library,
});

export default libraryState;
