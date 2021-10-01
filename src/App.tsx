import React, { useEffect, useState } from 'react';

import './App.scss';
import { Col, Container, Form, Navbar, Row, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { Howl } from 'howler';

function App() {
  const [dialog, setDialog] = useState('Lorem ipsum Danlante');
  const [scared, setScared] = useState(false);
  const [characterIndex, setCharacterIndex] = useState(1);
  const [emotionIndex, setEmotionIndex] = useState(2);
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [shakeIndex, setShakeIndex] = useState(-1);
  const [loadedSounds, setLoadedSounds] = useState<string[]>([]);
  const [characters] = useState<ICharacter[]>([
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
      portraitFile: 'characters/lila/lila-portrait.png',
      voiceFile: 'characters/lila/lila_voice.ogg',
      voice: new Howl({
        src: ['characters/lila/lila_voice.ogg'],
        html5: true,
        preload: false,
        onload: () => {
          const uLoadedSounds = [...loadedSounds];
          uLoadedSounds.push('characters/lila/lila_voice.ogg');

          setLoadedSounds(uLoadedSounds);
        },
      }),
    },
  ]);

  interface ICharacter {
    name: string;
    portraitFile?: string;
    emotions: string[];
    voiceFile?: string;
    voice?: Howl;
  }

  function voiceLoaded(voiceFile: string) {
    console.log(voiceFile, loadedSounds, loadedSounds.indexOf(voiceFile) > -1);
    return loadedSounds.indexOf(voiceFile) > -1;
  }
  function getEmotionPosition(emotionIndex: number) {
    return `-${100 * emotionIndex}px`;
  }

  async function playDialog() {
    let delay = 30;

    if (speed === 'slow') {
      delay = 100;
    }

    const generatedDialog = dialogToLetters(dialog);

    // hide all letters
    generatedDialog.forEach((letter, letterIndex) => {
      const letterElement = document.getElementById('letter-' + letterIndex);
      if (letterElement) {
        letterElement.style.opacity = '0';
      }
    });

    let letterIndex = -1;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const letter of generatedDialog) {
      letterIndex++;
      const letterElement = document.getElementById('letter-' + letterIndex);
      if (letterElement) {
        await showLetter(letterIndex, delay);
      }
    }
  }

  function showLetter(index: number, delay: number): Promise<void> {
    return new Promise((resolve) => {
      const letterElement = document.getElementById('letter-' + index);
      if (!letterElement) {
        return resolve();
      }

      letterElement.style.opacity = '1';
      const voice = characters[characterIndex].voice;
      if (voice) {
        if (!voiceLoaded(characters[characterIndex].voiceFile || '')) {
          voice.load();
        }

        voice.play();
      }

      setTimeout(() => {
        return resolve();
      }, delay);
    });
  }

  useEffect(() => {
    setInterval(() => {
      const max = dialog.length + 20;
      setShakeIndex(Math.floor(Math.random() * max));
    }, 500);
  }, [dialog.length]);

  function dialogToLetters(dialog: string) {
    const letters: {
      letter: string;
      delay: string;
    }[] = [];
    for (let letterIndex = 0; letterIndex < dialog.length; letterIndex++) {
      const letter = dialog[letterIndex];

      const dif = Math.floor(Math.random() * 2);
      letters.push({
        letter,
        delay: '0.' + letterIndex + dif + 's',
      });
    }

    return letters;
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">LD49 Dialog editor</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-2">
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Character</Form.Label>
                    <Row>
                      <select
                        defaultValue={characterIndex}
                        onChange={(e) => {
                          setCharacterIndex(parseInt(e.target.value));
                        }}
                      >
                        {characters.map((character, characterIndex) => {
                          return (
                            <option key={characterIndex} value={characterIndex}>
                              {character.name}
                            </option>
                          );
                        })}
                      </select>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Emotion</Form.Label>
                    <Row>
                      <select
                        defaultValue={emotionIndex}
                        onChange={(e) => {
                          setEmotionIndex(parseInt(e.target.value));
                        }}
                      >
                        {characters[characterIndex].emotions.map((emotion, emotionIndex) => {
                          return (
                            <option key={emotionIndex} value={emotionIndex}>
                              {emotion}
                            </option>
                          );
                        })}
                      </select>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Speed</Form.Label>
                    <Row className="text-left">
                      <select
                        onChange={(e) => {
                          setSpeed(e.target.value as any);
                        }}
                      >
                        <option value="normal">Normal</option>
                        <option value="slow">Slow</option>
                      </select>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Scared</Form.Label>
                    <Row className="text-left">
                      <input
                        type="checkbox"
                        defaultChecked={scared}
                        onChange={() => {
                          setScared(!scared);
                        }}
                      />
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Text</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Text goes here..."
                  onChange={(e) => {
                    setDialog(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={() => {
                  playDialog();
                }}
              >
                Play
              </Button>
            </Form>
          </Col>
          <Col>
            <div className="preview">
              <h5>Preview</h5>
              <div className="preview-container">
                {characters[characterIndex].portraitFile && (
                  <div
                    className="character-portrait"
                    style={{
                      backgroundImage: `url('${characters[characterIndex].portraitFile}')`,
                      backgroundPositionX: getEmotionPosition(emotionIndex),
                    }}
                  ></div>
                )}

                <div className={classNames('character-dialog', { scared: scared })}>
                  <span className="asterix letter">*</span>
                  <div className="dialog-text">
                    {dialogToLetters(dialog).map((letter, letterIndex) => {
                      return (
                        <span
                          key={letterIndex}
                          id={'letter-' + letterIndex}
                          className={classNames('letter', { shake: shakeIndex === letterIndex })}
                          style={{ animationDelay: letter.delay }}
                        >
                          {letter.letter}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
