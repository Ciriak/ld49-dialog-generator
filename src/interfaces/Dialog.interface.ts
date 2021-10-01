export default interface IDialog {
  characterIndex: number;
  emotionIndex: number;
  text: string;
  speed: 'normal' | 'slow';
  /**
   * Shake the text
   */
  isScared?: boolean;
  /**
   * Goes to the next step without any player interaction
   */
  autoSkip?: boolean;

  /**
   * If true, no voice sound will be played
   */
  noSound?: boolean;
  /**
   * An in game script to run when the dialog start
   */
  script?: string;
}
