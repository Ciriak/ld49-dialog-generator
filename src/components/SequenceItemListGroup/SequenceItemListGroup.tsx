import { mdiChatQuestion, mdiDelete, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { cloneDeep } from 'lodash';
import { ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useSequence from '../../hooks/useSequence';
import IChoice from '../../interfaces/Choice.interface';
import IDialog from '../../interfaces/Dialog.interface';
import { ISequenceItem } from '../../interfaces/Sequence.interface';
import DialogPortrait from '../DialogPortrait/DialogPortrait';
import { useHistory } from 'react-router';
import './sequence-item-list-group.scss';
import { toast } from 'react-toastify';
interface ISequenceItemListGroupProps {
  item: ISequenceItem;
  hasLink?: boolean;
  hasDelete?: boolean;
  itemIndex: number;
  sequenceIndex: number;
}

function ItemOptions(props: ISequenceItemListGroupProps) {
  const { sequence, setSequence } = useSequence(props.sequenceIndex);
  const history = useHistory();
  function handleDeleteItem(item: ISequenceItem) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Delete item ?')) {
      const updatedSequence = cloneDeep(sequence);
      updatedSequence.items.splice(props.itemIndex, 1);
      setSequence(updatedSequence);
      history.push(`/sequence/${sequence.internalName}`);
      toast('Item deleted', { type: 'info', position: 'bottom-right' });
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }

  return (
    <>
      <Link to={`/sequence/${sequence.internalName}/item/${props.itemIndex}`} key={props.itemIndex}>
        <Button size="sm" variant="link">
          <Icon path={mdiPencil} size={0.8} />
        </Button>
      </Link>
      <Button
        size="sm"
        variant="link"
        style={{ color: 'red' }}
        onClick={() => {
          handleDeleteItem(props.item);
        }}
      >
        <Icon path={mdiDelete} size={0.8} />
      </Button>
    </>
  );
}
export default function SequenceItemListGroup(props: ISequenceItemListGroupProps) {
  const item = props.item;
  return (
    <>
      {item.type === 'dialog' && (
        <ListGroup.Item className="d-flex align-items-center">
          <DialogPortrait size={24} dialog={item.item as IDialog} />
          <span className="item-text">{(item.item as IDialog).text}</span>
          {props.hasLink && <ItemOptions {...props} />}
        </ListGroup.Item>
      )}
      {item.type === 'choice' && (
        <ListGroup.Item className="d-flex align-items-center">
          <DialogPortrait size={24} dialog={(item.item as IChoice).dialog} />
          <Icon path={mdiChatQuestion} size={1} />
          <span className="item-text">
            {(item.item as IChoice).dialog.text} ({(item.item as IChoice).options.length})
          </span>

          {props.hasLink && <ItemOptions {...props} />}
        </ListGroup.Item>
      )}
    </>
  );
}
