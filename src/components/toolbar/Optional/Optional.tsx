// currentTarget을 어떻게 알려줄지

import { useSelector } from "react-redux";
import { setDecreaseFontSize, setFontBold, setFontColor, setFontUnderline, setIncreaseFontSize, setShapeColor, setStrokeColor } from "../../../canvasController";
import { Add, BorderColor, ColorLens, FormatBold, FormatColorFill, FormatColorText, FormatSize, FormatUnderlined, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import OutsideClickMenu from "./OutsideClickMenu";
// import { ctx } from "../canvas/Canvas";

export default function Optional() {
  
  const {target: currentTarget, activeObject} = useSelector(state => (state as any).authoring)
  const canvas = useSelector(state => (state as any).authoring).canvas
  // const [fontSize, setFontSize] = useState();

  // useEffect(()=> {
  //   activeObject.fontSize && setFontSize(activeObject.fontSize);
  // },[activeObject.fontSize])

  const onIncreaseFontSizeClick = () => {
    setIncreaseFontSize(canvas);
  }

  const onDecreaseFontSizeClick = () => {
    setDecreaseFontSize(canvas);
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

  const onFontBoldClick = () => {
    setFontBold(canvas);
  }



  return (
    <>
      {currentTarget === "text" && (
        <div className="flex items-center justify-center mt-2 mb-2">
          <div className="h-6 w-0 border-l border-gray-400"></div>
          <div onClick={onFontBoldClick} className="mx-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><FormatBold/></div>
          <OutsideClickMenu />
          <div onClick={onFontUnderlineClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><FormatUnderlined/></div>
          <div className="flex items-center justify-center  text-gray-500 border-gray-400 border rounded-md h-8 text-center">
            <Remove onClick={onDecreaseFontSizeClick} className="mx-2 cursor-pointer"/>
            <div className="mr-2">{activeObject.fontSize}</div>
            <Add onClick={onIncreaseFontSizeClick} className="mr-2 cursor-pointer"/>
          </div>
        </div>
      )}
      {currentTarget === "shape" && (
        <div className="flex items-center justify-center mt-2 mb-2">
          <div className="h-6 w-0 border-l border-gray-400"></div>
          <div onClick={onFillColorClick} className="mx-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><FormatColorFill/></div>
          <div onClick={onStrokeColorClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><BorderColor/></div>
        </div>
      )}
    </>
  );
}
