import { Howl } from 'howler';
export default interface ICharacter {
  name: string;
  portraitFile?: string;
  emotions: string[];
  voiceFile?: string;
  voice?: Howl;
}
