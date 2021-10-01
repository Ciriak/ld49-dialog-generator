import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import DialogPortrait from '../DialogPortrait/DialogPortrait';
import IDialog from '../../interfaces/Dialog.interface';
import { dialogToLetters } from '../../utils/utils';
import './dialog-preview.scss';
interface IDialogPreviewProps {
  dialog: IDialog;
}

export default function DialogPreview(props: IDialogPreviewProps) {
  const dialog = props.dialog;
  const [shakeIndex, setShakeIndex] = useState(-1);

  useEffect(() => {
    setInterval(() => {
      const max = dialog.text.length + 20;
      setShakeIndex(Math.floor(Math.random() * max));
    }, 500);
  }, [dialog.text.length]);

  return (
    <div className="dialog-preview">
      <h5>Preview</h5>
      <div className="preview-container">
        <DialogPortrait dialog={dialog} size={100} />
        <div className={classNames('character-dialog', { scared: dialog.isScared })}>
          <span className="asterix letter">*</span>
          <div className="dialog-text">
            {dialogToLetters(dialog.text).map((letter, letterIndex) => {
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
  );
}
