import IDialog from '../../interfaces/Dialog.interface';
import characters from '../../characters';
import './dialog-portrait.scss';

interface IDialogPortraitProps {
  dialog: IDialog;
  size: number;
}

export default function DialogPortrait(props: IDialogPortraitProps) {
  function getEmotionPosition(emotionIndex: number) {
    return `-${props.size * emotionIndex}px`;
  }

  const dialog = props.dialog;
  const size = props.size;
  return (
    <div className="dialog-portrait-container">
      {characters[dialog.characterIndex]?.portraitFile && (
        <div
          className="character-portrait"
          style={{
            width: size + 'px',
            height: size + 'px',
            backgroundImage: `url('${characters[dialog.characterIndex].portraitFile}')`,
            backgroundPositionX: getEmotionPosition(dialog.emotionIndex),
          }}
        ></div>
      )}
    </div>
  );
}
