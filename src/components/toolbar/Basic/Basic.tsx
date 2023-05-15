// import { ctx } from "../canvas/Canvas";

import { useSelector } from "react-redux";
import { insertRect, insertText, remove, save } from "../../../canvasController";
import { AddBox, RemoveCircleOutline, TextIncrease } from "@mui/icons-material";
import OutsideClickMenu from "../Optional/OutsideClickMenu";

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
    <>
      <div className="bg-blue-500 px-5 pt-2 pb-2 text-center text-white cursor-pointer" onClick={onSaveClick}>SAVE</div>
      <div onClick={onInsertTextClick} className="text-center text-blue-500 cursor-pointer"><TextIncrease/></div>
      <div onClick={onInsertRectClick} className="text-center text-blue-500 cursor-pointer"><AddBox/></div>
      <div onClick={onRemoveClick} className="text-center text-blue-500 cursor-pointer"><RemoveCircleOutline/></div>
      {/* <OutsideClickMenu/>  */}
    </>
  );
}
