import IChoice from './Choice.interface';
import IDialog from './Dialog.interface';

export default interface ISequence {
  internalName: string;
  items: ISequenceItem[];
}

export interface ISequenceItem {
  type: 'choice' | 'dialog';
  data: IDialog | IChoice;
}
