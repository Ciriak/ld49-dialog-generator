import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ICharacter from '../../interfaces/Character.interface';
import charactersData from '../../characters';
import { useParams } from 'react-router';

import DialogPreview from '../DialogPreview/DialogPreview';
import useChoice from '../../hooks/useChoice';
import IDialog from '../../interfaces/Dialog.interface';
import { cloneDeep } from 'lodash';

export default function Choice() {
  const params = useParams<{ sequenceName: string; itemIndex: string }>();
  const [characters] = useState<ICharacter[]>(charactersData);
  const { choice, setChoice } = useChoice(params.sequenceName, parseInt(params.itemIndex));

  function setChoiceDialog(dialog: IDialog) {
    const cChoice = cloneDeep(choice);
    cChoice.dialog = cloneDeep(dialog);
    setChoice(cChoice);
  }

  return (
    <div className="choice">
      <Row>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Character</Form.Label>
                <Row>
                  <select
                    value={choice.dialog.characterIndex}
                    onChange={(e) => {
                      setChoiceDialog({ ...choice.dialog, characterIndex: parseInt(e.target.value) });
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
                    value={choice.dialog.emotionIndex}
                    onChange={(e) => {
                      setChoiceDialog({ ...choice.dialog, emotionIndex: parseInt(e.target.value) });
                    }}
                  >
                    {characters[choice.dialog.characterIndex].emotions.map((emotion, emotionIndex) => {
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
                    value={choice.dialog.speed}
                    onChange={(e) => {
                      setChoiceDialog({ ...choice.dialog, speed: e.target.value as any });
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
                    checked={choice.dialog.isScared}
                    onChange={() => {
                      setChoiceDialog({ ...choice.dialog, isScared: !choice.dialog.isScared });
                    }}
                  />
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Text</Form.Label>

            <Form.Control
              defaultValue={choice.dialog.text}
              as="textarea"
              rows={3}
              placeholder="Text goes here..."
              onChange={(e) => {
                setChoiceDialog({ ...choice.dialog, text: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Script (optionnal)</Form.Label>

            <Form.Control
              defaultValue={choice.dialog.script}
              as="textarea"
              rows={1}
              placeholder="Script"
              onChange={(e) => {
                setChoiceDialog({ ...choice.dialog, script: e.target.value });
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
        </Form>
      </Row>
      <Row>
        <DialogPreview dialog={choice.dialog} />
      </Row>
    </div>
  );
}
