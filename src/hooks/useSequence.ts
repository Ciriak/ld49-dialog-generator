import { cloneDeep } from 'lodash';

import ISequence from '../interfaces/Sequence.interface';
import useLibrary from './useLibrary';

function useSequence(sequenceIndex: number) {
  const { library, setLibrary } = useLibrary();

  const sequence = library.sequences[sequenceIndex];
  function setSequence(updatedSequence: ISequence) {
    const updatedLibrary = cloneDeep(library);
    updatedLibrary.sequences[sequenceIndex] = updatedSequence;

    setLibrary(updatedLibrary);
  }
  return { sequence, setSequence };
}

export default useSequence;
