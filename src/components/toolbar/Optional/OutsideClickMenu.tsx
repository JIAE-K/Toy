import React, { useEffect, useRef, useState } from 'react'
import Canvas from '../../canvas/Canvas';
import { FormatColorText } from '@mui/icons-material';
import { setFontColor } from '../../../canvasController';
import { useSelector } from 'react-redux';
const OutsideClickMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const canvas = useSelector(state => (state as any).authoring).canvas

    
    const onFontColorClick = () => {
        setFontColor(canvas);
      }

  return (
    <div>
        <button onClick={() => setIsOpen(!isOpen)} className="mr-2 text-gray-500 border-gray-400 border rounded-md w-10 h-8 text-center cursor-pointer"><FormatColorText/></button>
        {isOpen && (
            <div className='absolute bg-white border border-gray-300 rounded shadow-lg mt-2'>
                <div className='p-2 flex'>
                    <div onClick={onFontColorClick} className="bg-black w-5 h-5 mr-2" />
                    <div onClick={onFontColorClick} className="bg-white border border-black w-5 h-5 mr-2" />
                    <div onClick={onFontColorClick} className="bg-red-500 w-5 h-5 mr-2" />
                    <div onClick={onFontColorClick} className="bg-green-500 w-5 h-5 mr-2" />
                    <div onClick={onFontColorClick} className="bg-blue-500 w-5 h-5 mr-2" />
                </div>
            </div>
        )}
        {/* <Canvas/> */}
    </div>
  )
}

export default OutsideClickMenu;
