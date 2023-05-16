// currentTarget을 어떻게 알려줄지

import { useSelector } from "react-redux";
import { setDecreaseFontSize, setFontBold, setFontItalic, setFontStroke, setFontUnderline, setIncreaseFontSize } from "../../../canvasController";
import { Add, BorderColor, FormatBold, FormatColorFill, FormatColorText, FormatItalic,  FormatStrikethrough, FormatUnderlined, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ColorMenu } from "./ColorMenu";
// import { ctx } from "../canvas/Canvas";

export default function Optional() {
  
  const {target: currentTarget, activeObject, canvas} = useSelector(state => (state as any).authoring)
  
  const [fontSize, setFontSize] = useState(0);
  useEffect(()=> {
    activeObject && setFontSize(activeObject.fontSize);
  },[activeObject])

  const onIncreaseFontSizeClick = () => {
    activeObject && setFontSize(activeObject.fontSize + 1);
    setIncreaseFontSize(canvas);
  }

  const onDecreaseFontSizeClick = () => {
    activeObject && setFontSize(activeObject.fontSize - 1);
    setDecreaseFontSize(canvas);
  }

  const onFontUnderlineClick = () => {
    setFontUnderline(canvas)
  }

  // const onFillColorClick = () => {
  //   setShapeColor(canvas)
  // }

  // const onStrokeColorClick = () => {
  //   setStrokeColor(canvas);
  // }

  const onFontBoldClick = () => {
    setFontBold(canvas);
  }

  const onFontItalicClick = () => {
    setFontItalic(canvas);
  }

  const onFontStrokeClick = () => {
    setFontStroke(canvas);
  }




  return (
    <>
      {currentTarget === "text" && (
        <div className="flex items-center justify-center mt-2 mb-2">
          <div className="h-6 w-0 border-l border-gray-400 mr-4"></div>
          <div onClick={onFontBoldClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-8 h-8 text-center cursor-pointer"><FormatBold/></div>
          <div onClick={onFontItalicClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-8 h-8 text-center cursor-pointer"><FormatItalic/></div>
          <div onClick={onFontStrokeClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-8 h-8 text-center cursor-pointer"><FormatStrikethrough/></div>
          <div onClick={onFontUnderlineClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-8 h-8 text-center cursor-pointer"><FormatUnderlined/></div>
          <ColorMenu icon={FormatColorText}/>
          <div className="flex items-center justify-center  text-gray-500 border-gray-400 border rounded-md h-8 text-center">
            <Remove onClick={onDecreaseFontSizeClick} className="mx-2 cursor-pointer"/>
            <div className="mr-2">{fontSize}</div>
            <Add onClick={onIncreaseFontSizeClick} className="mr-2 cursor-pointer"/>
          </div>
        </div>
      )}
      {currentTarget === "shape" && (
        <div className="flex items-center justify-center mt-2 mb-2">
          <div className="h-6 w-0 border-l border-gray-400 mr-4"></div>
          <ColorMenu icon={FormatColorFill}/>
          <ColorMenu icon={BorderColor}/>
          {/* <div onClick={onStrokeColorClick} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><BorderColor/></div> */}
        </div>
      )}
    </>
  );
}
