import { fabric } from "fabric";
import { useSelector } from "react-redux";

/**
 * TOOLBOX에서 호출된 객체 그려기
 * INTERACTION에서 호출된 속성 넣어주기
 *
 * CURRENT TARGET에 대한 정보를 실시간으로 알려주는 기능
 *
 *
 *
 *
 *
 *
 */

const createCanvasController = (canvas: fabric.Canvas) => {
  const save = () => {
    // DATA 구조 설계

    // CANVAS DATA => canvas.toJSON()
    // INTERACTION DATA => ? 대상은 초이스를 기준으로

    // 초이스를 표현하기 위해 필요한 데이터가 무엇인가?
    // 객체 정보
    // 정답 정보
    // 순서 정보
    //
    // 렌더링 생각으 해봤을 때까지 고려를 해서 DATA 설계 들어가야함
    //

    const canvasData = canvas.toJSON(["data"]);
    const jsonData = JSON.stringify(canvasData);
    localStorage.setItem("canvasData", jsonData);
  };

  const insertText = () => {
    console.log("insert text");
    const text = new fabric.Textbox("TEXT", { top: 0, left: 0 });

    canvas.add(text);
    canvas.renderAll();
  };
  const insertRect = () => {
    console.log("insert rect");
    const rect = new fabric.Rect({ left: 0, top: 0, width: 50, height: 50 });
    canvas.selection = true;
    canvas.add(rect);
    canvas.renderAll();
  };

  const setFontSize = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject instanceof fabric.Textbox) {
      activeObject.fontSize === 40
        ? activeObject.set("fontSize", 20)
        : activeObject.set("fontSize", 40);
      canvas.renderAll();
    }
  };

  const setFontUnderline = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject instanceof fabric.Textbox) {
      activeObject.underline
        ? activeObject.set("underline", false)
        : activeObject.set("underline", true);
      canvas.renderAll();
    }
  };

  const setFontColor = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject instanceof fabric.Textbox) {
      activeObject.fill === "orange"
        ? activeObject.set("fill", "black")
        : activeObject.set("fill", "orange");
      canvas.renderAll();
    }
  };

  const setShapeColor = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      activeObject.fill === "blue"
        ? activeObject.set("fill", "black")
        : activeObject.set("fill", "blue");
      canvas.renderAll();
    }
  };

  const setStrokeColor = () => {
    const activeObject = canvas.getActiveObject();

    if (activeObject instanceof fabric.Textbox) {
      activeObject.set("strokeWidth", 3);
      activeObject.set("stroke", "orange");
      canvas.renderAll();
    }
  };

  const remove = () => {
    const activeObject = canvas.getActiveObject();
    activeObject && canvas.remove(activeObject);
  };

  return {
    save,
    insertText,
    insertRect,
    setFontSize,
    setFontUnderline,
    setFontColor,
    setShapeColor,
    setStrokeColor,
    remove,
  };
};

export default createCanvasController;

// const canvasController = createCanvasController;

// export default canvasController();

/**
 *  캔버스 컨트롤러가 캔버스 컨트롤하기 위해 필요한 것.
 *  const canvas = new fabric.Canvas("canvas");  canvas를 잡아야 함
 *
 *
 */
// const { activeObject, canvas } = useSelector(
//   (state) => (state as any).authoring
// );

export const save = (canvas: fabric.Canvas) => {
  // DATA 구조 설계

  // CANVAS DATA => canvas.toJSON()
  // INTERACTION DATA => ? 대상은 초이스를 기준으로

  // 초이스를 표현하기 위해 필요한 데이터가 무엇인가?
  // 객체 정보
  // 정답 정보
  // 순서 정보
  //
  // 렌더링 생각으 해봤을 때까지 고려를 해서 DATA 설계 들어가야함
  //

  const canvasData = canvas.toJSON(["data"]);
  const jsonData = JSON.stringify(canvasData);
  localStorage.setItem("canvasData", jsonData);
  // localStorage.setItem("options", )
};

export const insertText = (canvas: fabric.Canvas) => {
  console.log("insert text");
  const text = new fabric.Textbox("TEXT", { top: 0, left: 0 });

  canvas.add(text);
  canvas.renderAll();
};
export const insertRect = (canvas: fabric.Canvas) => {
  console.log("insert rect");
  const rect = new fabric.Rect({ left: 0, top: 0, width: 50, height: 50 });
  canvas.selection = true;
  canvas.add(rect);
  canvas.renderAll();
};

export const setFontBold = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.fontWeight !== "bold"
      ? activeObject.set("fontWeight", "bold")
      : activeObject.set("fontWeight", "");
    canvas.renderAll();
  }
};

export const setFontItalic = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.fontStyle !== "italic"
      ? activeObject.set("fontStyle", "italic")
      : activeObject.set("fontStyle", "");
    canvas.renderAll();
  }
};

export const setFontStroke = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.linethrough
      ? activeObject.set("linethrough", false)
      : activeObject.set("linethrough", true);
    canvas.renderAll();
  }
};

export const setIncreaseFontSize = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.set("fontSize", activeObject.fontSize! + 1);
    console.log(fabric.Textbox);
    canvas.renderAll();
  }
};

export const setDecreaseFontSize = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.set("fontSize", activeObject.fontSize! - 1);
    canvas.renderAll();
  }
};

export const setFontUnderline = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Textbox) {
    activeObject.underline
      ? activeObject.set("underline", false)
      : activeObject.set("underline", true);
    canvas.renderAll();
  }
};

export const setFontColor = (canvas: fabric.Canvas, color: string) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Object) {
    activeObject.set("fill", color);
    if (activeObject.data?.src)
      activeObject.data.src = activeObject.toDataURL({});
  }
  canvas.renderAll();
};

export const setShapeColor = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Rect) {
    activeObject.fill === "blue"
      ? activeObject.set("fill", "black")
      : activeObject.set("fill", "blue");
    canvas.renderAll();
  }
};

export const setStrokeColor = (canvas: fabric.Canvas, color: string) => {
  const activeObject = canvas.getActiveObject();

  if (activeObject instanceof fabric.Rect) {
    if (color !== "white") {
      activeObject.set("strokeWidth", 3);
      activeObject.set("stroke", color);
    } else {
      activeObject.set("strokeWidth", 0);
    }
    canvas.renderAll();
  }
};

export const remove = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();
  activeObject && canvas.remove(activeObject);
};
