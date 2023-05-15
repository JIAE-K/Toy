import { fabric } from "fabric";
import { createContext, useContext, useEffect } from "react";
import createCanvasController from "../../canvasController";
import { useDispatch } from "react-redux";
import { setActiveObejct, setCanvas, setTarget } from "../../slices/slice";

// CTX USE CONTEXT 사용해서 전역관리 해보기
// active object 나머지 수정하고
// DATA 구조 고려해서 초이스 인터랙션 기능 개발
// 인터랙션 UI 만들고 DATA 저장하기
// 초이스에서 필요한 정보
// 캔버스에 그려지는 객체들 중 어떤게 초이스인지 > click 이벤트 줘야되고,
// 그리고 그 초이스들 중에서 어떤 게 정답인지 > 정/오답 표시 해줄 수 있고,

export default function Canvas() {
  const dispatch = useDispatch();


  useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    const ctx = createCanvasController(canvas);
    dispatch(setCanvas(canvas))
    
    //canvas 사이즈 설정
    canvas.setDimensions({ width: 600, height: 400 });
    canvas.renderAll();

    //저장 Data 불러오기
    const jsonData = localStorage.getItem('canvasData');
    if(jsonData){
      const canvasData = JSON.parse(jsonData);
      canvas.loadFromJSON(canvasData, canvas.renderAll.bind(canvas))
    }

    //canvas 내 이벤트 감지
    canvas.on("object:modified", function (e: any) {
      const activeObject = canvas.getActiveObject();
      if(!activeObject) return;
      activeObject.type === "textbox" || activeObject.type === "text"
        ? dispatch(setTarget("text"))
        : dispatch(setTarget("shape"));
      dispatch(setActiveObejct(activeObject));
    });

    canvas.on("selection:updated", function (e: any) {
      const activeObject = canvas.getActiveObject();
      if(!activeObject) return;
      activeObject.type === "textbox" || activeObject.type === "text"
        ? dispatch(setTarget("text"))
        : dispatch(setTarget("shape"));
        dispatch(setActiveObejct(activeObject));
    });

    canvas.on("selection:created", function (e: any) {
      const activeObject = canvas.getActiveObject();
      if(!activeObject) return;
      activeObject.type === "textbox" || activeObject.type === "text"
        ? dispatch(setTarget("text"))
        : dispatch(setTarget("shape"));
        dispatch(setActiveObejct(activeObject));
    });

    canvas.on("selection:cleared", function (e: any) {
      dispatch(setTarget(undefined));
      dispatch(setActiveObejct(undefined));
    });

  }, [dispatch]);



  return (
    <div>
      <canvas id="canvas" ></canvas>
    </div>
  );
}
