import React, { useEffect, useState } from "react";
import { FormatColorText } from "@mui/icons-material";
import { setFontColor, setStrokeColor } from "../../../canvasController";
import { useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { CompactPicker } from "react-color";

interface ColorMenuProps {
  icon: any;
}
export const ColorMenu: React.FC<ColorMenuProps> = ({ icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const canvas = useSelector((state) => (state as any).authoring).canvas;

  const [color, setColor] = useState('#fff')

  const handleChangeComplete = (color: any) => {
    setColor(color.hex)
    
    if (icon.type.render.displayName === "BorderColorIcon") {
      setStrokeColor(canvas, color.hex);
    } else {
      setFontColor(canvas, color.hex);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mr-2 text-gray-500 border-gray-400 border rounded-md w-8 h-8 text-center cursor-pointer"
      >
        <Icon component={icon}></Icon>
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 z-40 ">
            <CompactPicker
              color={color} onChangeComplete={handleChangeComplete}
            ></CompactPicker>
        </div>
      )}
    </div>
  );
};
