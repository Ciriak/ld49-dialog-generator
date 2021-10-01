import { atom } from 'recoil';
import ISequence from '../interfaces/Sequence.interface';

export interface ILibraryState {
  sequences: ISequence[];
}

const rawSavedData = localStorage.getItem('library');
let library: ILibraryState = {
  sequences: [
    {
      internalName: 'seq_test',
      items: [
        {
          type: 'dialog',
          item: {
            characterIndex: 1,
            emotionIndex: 2,
            text: 'Hello world',
            speed: 'normal',
            isScared: true,
          },
        },
        {
          type: 'dialog',
          item: {
            characterIndex: 0,
            emotionIndex: 0,
            text: 'Text test 2',
            speed: 'slow',
          },
        },
        {
          type: 'dialog',
          item: {
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
if (rawSavedData) {
  library = JSON.parse(rawSavedData) as ILibraryState;
}
const libraryState = atom<ILibraryState>({
  key: 'library',
  default: {
    sequences: library?.sequences || [],
  },
});

export default libraryState;
