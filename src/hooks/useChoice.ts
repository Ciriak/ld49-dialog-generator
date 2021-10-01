import { cloneDeep, findIndex } from 'lodash';
import IChoice from '../interfaces/Choice.interface';
import useLibrary from './useLibrary';

function useChoice(sequenceName: string, choiceIndex: number) {
  const { library, setLibrary } = useLibrary();
  const sequenceIndex = findIndex(library.sequences, { internalName: sequenceName });
  const choice = library.sequences[sequenceIndex].items[choiceIndex].data as IChoice;
  function setChoice(updatedCHoice: IChoice) {
    const updatedLibrary = cloneDeep(library);
    updatedLibrary.sequences[sequenceIndex].items[choiceIndex].data = updatedCHoice;

    setLibrary(updatedLibrary);
  }
  return { choice, setChoice };
}

export default useChoice;
