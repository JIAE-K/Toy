// currentTarget을 어떻게 알려줄지

import { useSelector } from "react-redux";
import { setFontColor, setFontSize, setFontUnderline, setShapeColor, setStrokeColor } from "../../canvasController";
// import { ctx } from "../canvas/Canvas";

export default function Optional() {
  
  const currentTarget = useSelector(state => (state as any).authoring).target
  const canvas = useSelector(state => (state as any).authoring).canvas

  const onFontSizeClick = () => {
    setFontSize(canvas);
  }

  const onFontUnderlineClick = () => {
    setFontUnderline(canvas)
  }

  const onFontColorClick = () => {
    setFontColor(canvas);
  }

  const onFillColorClick = () => {
    setShapeColor(canvas)
  }

  const onStrokeColorClick = () => {
    setStrokeColor(canvas);
  }


  return (
    <div className="gap-x-7 flex bg-yellow-100">
      {currentTarget === "text" && (
        <>
          <div onClick={onFontSizeClick}>Bold</div>
          <div onClick={onFontSizeClick}>Font Size</div>
          <div onClick={onFontColorClick}>Font Color</div>
          <div onClick={onFontUnderlineClick}>Underline</div>
        </>
      )}
      {currentTarget === "shape" && (
        <>
          <div onClick={onFillColorClick}>Fill Color</div>
          <div onClick={onStrokeColorClick}>Stroke Color</div>
        </>
      )}
    </div>
  );
}
