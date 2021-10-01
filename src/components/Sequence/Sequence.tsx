import { cloneDeep, findIndex } from 'lodash';
import react, { useEffect, useState } from 'react';
import { Col, Form, ListGroup, Row, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import useLibrary from '../../hooks/useLibrary';
import useSequence from '../../hooks/useSequence';
import './sequence.scss';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { ISequenceItem } from '../../interfaces/Sequence.interface';
import IDialog from '../../interfaces/Dialog.interface';
import { toast } from 'react-toastify';
import SequenceItemListGroup from '../SequenceItemListGroup/SequenceItemListGroup';
import Icon from '@mdi/react';
import { mdiChat, mdiChatQuestion } from '@mdi/js';
import IChoice from '../../interfaces/Choice.interface';

export default function Sequence() {
  const params = useParams<{ sequenceName: string }>();
  const { library, setLibrary } = useLibrary();
  const history = useHistory();
  const sequenceIndex = findIndex(library.sequences, { internalName: params.sequenceName });
  const { sequence: lSequence, setSequence: lSetSequence } = useSequence(sequenceIndex);
  const [sequence, setSequence] = useState(lSequence);

  const SortableItem = SortableElement(({ item, itemIndex }: { item: ISequenceItem; itemIndex: number }) => {
    return <SequenceItemListGroup item={item} itemIndex={itemIndex} sequenceIndex={sequenceIndex} hasDelete={true} hasLink={true} />;
  });

  const SortableList = SortableContainer(({ items }: { items: ISequenceItem[] }) => {
    return (
      <ListGroup>
        {items.map((item, index) => (
          <SortableItem key={`item-${index}`} index={index} item={item} itemIndex={index} />
        ))}
      </ListGroup>
    );
  });

  useEffect(() => {
    if (params.sequenceName !== sequence.internalName) {
      // eslint-disable-next-line no-restricted-globals
      // location.reload();
    }
  });

  function handleSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
    const updatedSequence = { ...sequence };

    updatedSequence.items = arrayMove(updatedSequence.items, oldIndex, newIndex);
    setSequence(updatedSequence);
  }

  function handleSave() {
    lSetSequence({ ...sequence });
    history.push('/sequence/' + sequence.internalName);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  function handleRemoveSequence() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Delete Sequence ?')) {
      const updatedLibrary = cloneDeep(library);
      updatedLibrary.sequences.splice(sequenceIndex, 1);
      setLibrary(updatedLibrary);
      history.push('/');
      toast('Sequence deleted', { type: 'info', position: 'bottom-right' });
    }
  }

  function handleAddItem(type: 'dialog' | 'choice') {
    const updatedSequence = cloneDeep(sequence);
    const newDialog: IDialog = {
      emotionIndex: 1,
      characterIndex: 1,
      speed: 'normal',
      text: 'Placeholder text',
    };

    // add a dialog
    if (type === 'dialog') {
      updatedSequence.items.push({
        type: 'dialog',
        data: newDialog,
      });
    }

    // add a choice
    if (type === 'choice') {
      const newChoice: IChoice = {
        dialog: newDialog,
        options: [
          {
            text: 'Yes',
          },
          {
            text: 'No',
          },
        ],
      };
      updatedSequence.items.push({
        type,
        data: newChoice,
      });
    }

    setSequence(updatedSequence);
    lSetSequence({ ...updatedSequence });
  }

  return (
    <div className="sequence">
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>internal name</Form.Label>

            <Row>
              <input
                type="text"
                className="form-control"
                defaultValue={sequence.internalName}
                placeholder="seq_test_name"
                onChange={(e) => {
                  setSequence({ ...sequence, internalName: e.target.value });
                }}
              />
            </Row>
            <small>
              Must be in format <i>your_sequence_name</i>
            </small>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Items List </Form.Label>

          <Button
            variant="primary"
            size="sm"
            title="Add a dialog"
            onClick={() => {
              handleAddItem('dialog');
            }}
          >
            <Icon path={mdiChat} size={0.8} />+
          </Button>
          {/* <Button
            variant="primary"
            size="sm"
            title="Add a choice"
            onClick={() => {
              handleAddItem('choice');
            }}
          >
            <Icon path={mdiChatQuestion} size={0.8} />+
          </Button> */}
          <div className="sequence-items-sortable-list">
            <SortableList items={sequence.items} onSortEnd={handleSortEnd} distance={4} />
          </div>
        </Form.Group>
      </Row>
      <Row>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Row>
      <Row>
        <Col md="10"></Col>{' '}
        <Col>
          <Button variant="danger" onClick={handleRemoveSequence}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
}
