import { cloneDeep, findIndex } from 'lodash';
import IDialog from '../interfaces/Dialog.interface';
import useLibrary from './useLibrary';

function useDialog(sequenceName: string, dialogIndex: number) {
  const { library, setLibrary } = useLibrary();
  const sequenceIndex = findIndex(library.sequences, { internalName: sequenceName });
  const dialog = library.sequences[sequenceIndex].items[dialogIndex].item as IDialog;
  function setDialog(updatedDialog: IDialog) {
    const updatedLibrary = cloneDeep(library);
    updatedLibrary.sequences[sequenceIndex].items[dialogIndex].item = updatedDialog;

    setLibrary(updatedLibrary);
  }
  return { dialog, setDialog };
}

export default useDialog;
