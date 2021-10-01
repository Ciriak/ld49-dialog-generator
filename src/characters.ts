import ICharacter from './interfaces/Character.interface';
import { Howl } from 'howler';

const characters: ICharacter[] = [
  {
    name: 'Narrator',
    emotions: ['base'],
  },
  {
    name: 'Lila',
    emotions: [
      '{Empty}',
      'Scared',
      'Worried',
      'Done With your shit',
      'Thinking',
      'Smiling',
      'Happy',
      'Neutral',
      'Worried - Look Right',
      'Dead Inside',
    ],
    portraitFile: '/characters/lila/lila-portrait.png',
    voiceFile: '/characters/lila/lila_voice.ogg',
    voice: new Howl({
      src: ['/characters/lila/lila_voice.ogg'],
      html5: true,
      preload: false,
      onload: () => {
        console.log('oto');
      },
    }),
  },
];

export default characters;
