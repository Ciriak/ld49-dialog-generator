import react from 'react';

import { useParams } from 'react-router';

import { findIndex } from 'lodash';
import useLibrary from '../../hooks/useLibrary';
import Choice from '../Choice/Choice';
import Dialog from '../Dialog/Dialog';

export default function Item() {
  const params = useParams<{ sequenceName: string; itemIndex: string }>();
  const { library } = useLibrary();

  const sequenceIndex = findIndex(library.sequences, { internalName: params.sequenceName });

  const item = library.sequences[sequenceIndex].items[parseInt(params.itemIndex)];

  return (
    <div className="item">
      {item.type === 'choice' && <Choice />}
      {item.type === 'dialog' && <Dialog />}
    </div>
  );
}
