import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ICharacter from '../../interfaces/Character.interface';
import charactersData from '../../characters';
import { useParams } from 'react-router';

import DialogPreview from '../DialogPreview/DialogPreview';
import IChoice from '../../interfaces/Choice.interface';
import useItem from '../../hooks/useItem';
import Dialog from '../Dialog/Dialog';

interface IChoiceProps {
  choice: IChoice;
  sequenceName: string;
  itemIndex: number;
}

export default function Choice(props: IChoiceProps) {
  const choice = props.choice;
  const { item, setItem } = useItem(props.sequenceName, props.itemIndex);

  function setChoice(choice: IChoice) {
    setItem({ ...item, data: choice });
  }

  return (
    <div className="choice">
      <Dialog dialog={choice.dialog} itemIndex={props.itemIndex} sequenceName={props.sequenceName} />
    </div>
  );
}
