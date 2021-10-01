import { mdiFileSearch, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { Accordion, ListGroup, Button, Row, InputGroup, Col, Badge, ListGroupItem } from 'react-bootstrap';
import faker from 'faker';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useLibrary from '../../hooks/useLibrary';
import SequenceItemListGroup from '../SequenceItemListGroup/SequenceItemListGroup';

import './sequences-list.scss';
import ISequence from '../../interfaces/Sequence.interface';
export default function SequencesList() {
  const { library, setLibrary } = useLibrary();

  const [filter, setFilter] = useState<string | null>(null);

  const history = useHistory();
  function handleCreateSequence() {
    const updatedLibrary = cloneDeep(library);

    const newName = faker.random.word().toLowerCase();
    updatedLibrary.sequences.push({
      internalName: 'seq_' + newName,
      items: [],
    });

    setLibrary(updatedLibrary);
  }

  function editSequence(sequence: ISequence) {
    history.push(`/sequence/${sequence.internalName}`);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  return (
    <div className="sequences-list">
      <h5>Sequences list</h5>
      {filter}
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Icon path={mdiFileSearch} size={1} />
            </InputGroup.Text>
            <input
              type="search"
              className="form-control"
              placeholder="Filter"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Button variant="primary" size="sm" onClick={handleCreateSequence} title="Create a sequence">
            <Icon path={mdiPlus} size={1} />
          </Button>
        </Col>
      </Row>

      {library.sequences.map((sequence, sequenceIndex) => {
        return (
          <ListGroup>
            <ListGroupItem>
              <Col>
                <span>
                  {sequence.internalName} {'  '}
                </span>
                <Button
                  variant="link"
                  onClick={() => {
                    editSequence(sequence);
                  }}
                >
                  Edit
                </Button>
              </Col>
            </ListGroupItem>
          </ListGroup>
        );
      })}
    </div>
  );
}
