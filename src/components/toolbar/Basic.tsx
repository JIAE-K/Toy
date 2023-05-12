// import { ctx } from "../canvas/Canvas";

import { useSelector } from "react-redux";
import { insertRect, insertText, remove, save } from "../../canvasController";

export default function Basic() {
  const { canvas, options } = useSelector((state) => (state as any).authoring);

  const onSaveClick = () => {
    save(canvas);
    localStorage.setItem("options", options);
  }

  const onInsertTextClick = ()=> {
    // createCanvasController;
    // canvasController.insertText();
    insertText(canvas);
    // dispatch(setTarget('text'))
  }

  const onInsertRectClick = () => {
    insertRect(canvas);
    // dispatch(setTarget('shape'));
  }

  const onRemoveClick = () => {
    remove(canvas)
  }

  return (
    <div className="gap-x-7 flex bg-yellow-200">
      <div className="bg-violet-200 px-5" onClick={onSaveClick}>SAVE</div>
      <div onClick={onInsertTextClick}>Insert Text</div>
      <div onClick={onInsertRectClick}>Insert Rect</div>
      <div onClick={onRemoveClick}>Remove</div>
    </div>
  );
}
