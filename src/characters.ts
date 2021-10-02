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
      onload: () => {},
    }),
  },
  {
    name: 'The Cat',
    emotions: ['Smile', 'Neutral (no mouth)', 'Smile look right', 'Smile low eyes', 'Not smiling', 'Smiling 2', 'Smiling 3'],
    portraitFile: '/characters/cat/cat-portrait.png',
    voiceFile: '/characters/cat/cat_voice.ogg',
    voice: new Howl({
      src: ['/characters/lila/cat_voice.ogg'],
      html5: true,
      preload: false,
      onload: () => {},
    }),
  },
  {
    name: 'Dragon',
    emotions: ['Empty', 'Neutral', 'Worried', 'Smile'],
    portraitFile: '/characters/dragon/dragon-portrait.png',
    voiceFile: '/characters/dragon/dragon_voice.ogg',
    voice: new Howl({
      src: ['/characters/dragon/dragon_voice.ogg'],
      html5: true,
      preload: false,
      onload: () => {},
    }),
  },
];

export default characters;
