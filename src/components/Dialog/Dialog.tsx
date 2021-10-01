import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ICharacter from '../../interfaces/Character.interface';
import charactersData from '../../characters';
import { useParams } from 'react-router';

import { dialogToLetters } from '../../utils/utils';
import DialogPreview from '../DialogPreview/DialogPreview';
import useDialog from '../../hooks/useDialog';
import { Link } from 'react-router-dom';

export default function Dialog() {
  const params = useParams<{ sequenceName: string; itemIndex: string }>();
  const [characters] = useState<ICharacter[]>(charactersData);
  const { dialog, setDialog } = useDialog(params.sequenceName, parseInt(params.itemIndex));

  async function playDialog() {
    let delay = 30;

    if (dialog.speed === 'slow') {
      delay = 100;
    }

    const generatedDialog = dialogToLetters(dialog.text);

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

  function voiceLoaded(voiceFile: string) {
    return true;
    //  console.log(voiceFile, loadedSounds, loadedSounds.indexOf(voiceFile) > -1);
    //  return loadedSounds.indexOf(voiceFile) > -1;
  }

  function showLetter(index: number, delay: number): Promise<void> {
    return new Promise((resolve) => {
      const letterElement = document.getElementById('letter-' + index);
      if (!letterElement) {
        return resolve();
      }

      letterElement.style.opacity = '1';
      const voice = characters[dialog.characterIndex].voice;
      if (voice) {
        if (!voiceLoaded(characters[dialog.characterIndex].voiceFile || '')) {
          voice.load();
        }

        voice.play();
      }

      setTimeout(() => {
        return resolve();
      }, delay);
    });
  }

  return (
    <div className="dialog">
      <Row>
        <Link to={`/sequence/` + params.sequenceName}>Return to Sequence</Link> <small>(Changes are saved instantly)</small>
      </Row>

      <Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Character</Form.Label>
                <Row>
                  <select
                    value={dialog.characterIndex}
                    onChange={(e) => {
                      setDialog({ ...dialog, characterIndex: parseInt(e.target.value) });
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
                    value={dialog.emotionIndex}
                    onChange={(e) => {
                      setDialog({ ...dialog, emotionIndex: parseInt(e.target.value) });
                    }}
                  >
                    {characters[dialog.characterIndex].emotions.map((emotion, emotionIndex) => {
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
                    value={dialog.speed}
                    onChange={(e) => {
                      setDialog({ ...dialog, speed: e.target.value as any });
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
                    checked={dialog.isScared}
                    onChange={() => {
                      setDialog({ ...dialog, isScared: !dialog.isScared });
                    }}
                  />
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Text</Form.Label>

            <Form.Control
              defaultValue={dialog.text}
              as="textarea"
              rows={3}
              placeholder="Text goes here..."
              onChange={(e) => {
                setDialog({ ...dialog, text: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Script (optionnal)</Form.Label>

            <Form.Control
              defaultValue={dialog.script}
              as="textarea"
              rows={1}
              placeholder="Script"
              onChange={(e) => {
                setDialog({ ...dialog, script: e.target.value });
              }}
            />
            <small>
              To launch another sequence : <code>startSequence("seq_example")</code>
            </small>
            <br />
            <small>
              To set a flag : <code>setFlag("flagId", "value")</code>
            </small>
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
      </Row>
      <Row>
        <DialogPreview dialog={dialog} />
      </Row>
    </div>
  );
}
