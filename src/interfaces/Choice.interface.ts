import IDialog from './Dialog.interface';

export interface IOption {
  text: string;
  script?: string;
}

export default interface IChoice {
  dialog: IDialog;
  options: IOption[];
}
