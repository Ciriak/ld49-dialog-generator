import { mdiFileSearch, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { Accordion, ListGroup, Button, Row, InputGroup, Col, Badge } from 'react-bootstrap';
import faker from 'faker';
import { Link } from 'react-router-dom';
import useLibrary from '../../hooks/useLibrary';
import SequenceItemListGroup from '../SequenceItemListGroup/SequenceItemListGroup';

import './sequences-list.scss';
export default function SequencesList() {
  const { library, setLibrary } = useLibrary();

  const [filter, setFilter] = useState<string | null>(null);

  function handleCreateSequence() {
    const updatedLibrary = cloneDeep(library);

    const newName = faker.random.word().toLowerCase();
    updatedLibrary.sequences.push({
      internalName: 'seq_' + newName,
      items: [],
    });

    setLibrary(updatedLibrary);
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

      <Accordion>
        {library.sequences.map((sequence, sequenceIndex) => {
          return (
            <Accordion.Item key={sequenceIndex} eventKey={String(sequenceIndex)}>
              <Accordion.Header className="sequence-header">
                <Col>{sequence.internalName} </Col>
                <Badge>{sequence.items.length}</Badge>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="text-right">
                  <Link to={`/sequence/${sequence.internalName}`}>
                    <Button variant="link">Edit sequence infos</Button>
                  </Link>
                </Row>

                <ListGroup>
                  {sequence.items.map((sequenceItem, sequenceItemIndex) => {
                    return (
                      <SequenceItemListGroup
                        key={sequenceItemIndex}
                        item={sequenceItem}
                        sequenceIndex={sequenceIndex}
                        itemIndex={sequenceItemIndex}
                        hasLink={true}
                      />
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}
