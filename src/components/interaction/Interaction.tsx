import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setOptions } from "../../slices/slice";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

type choiceList = {
  id: string | undefined;
  src: string | undefined;
  answer: 0 | 1;
};
//localstorage에서 가져온 options list
const optionsItem = localStorage.getItem("options") ?? '';

export default function Interaction() {
  const [list, setList] = useState<choiceList[]>([]);
  const [newData, setNewData] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(list[0]?.id);
  const { activeObject, canvas } = useSelector(
    (state) => (state as any).authoring
  );

  const dispatch = useDispatch();

  const [test, setTest] = useState(['a'])

  useEffect(() => {
    if (!canvas || !optionsItem) return;

    //추가한 List 띄우기
    const jsonData = localStorage.getItem("canvasData");
    const _list = [];
    if (jsonData) {
      const canvasData = JSON.parse(jsonData);
      for (let i = 0; i < canvasData.objects.length; i++) {
        if (canvasData.objects[i].data) {
          _list.push({
            id: canvasData.objects[i].data.jeiId,
            src: canvasData.objects[i].data.src,
            answer: canvasData.objects[i].data.answer,
          });
        }
      }
      if (_list.length !== 0) {
        //순서 정렬
        const newData = optionsItem.split(',');
        const newList = _list.sort((next, curr) => {
          const currArrNum = newData.indexOf(curr.id);
          const nextArrNum = newData.indexOf(next.id);
          return nextArrNum - currArrNum;
        });

        // RadioButton 초기 설정
        const selectedChoice = newList.find((el) => el.answer === 1);
        selectedChoice && setIsChecked(selectedChoice.id);

        setList(newList);
        setNewData(newData);
      }
    }
  }, [canvas]);

  

  //newData 업데이트될 때마다 setOptions..
  useEffect(() => {
    dispatch(setOptions(newData));
  }, [newData, dispatch]);

  //add버튼 클릭 시 실행
  const onAddBtnClick = () => {
    if (activeObject && activeObject?.data?.jeiRole !== "choice") {
      activeObject.set("data", {
        jeiRole: "choice",
        jeiId: uuidv4(),
        src: activeObject.toDataURL(),
        answer: 0,
      });
      setList([
        ...list,
        {
          id: activeObject.data.jeiId,
          src: activeObject.toDataURL(),
          answer: 0,
        },
      ]);
      //순서 정렬을 위한 options 저장
      setNewData((prev) => [...prev, activeObject.data.jeiId]);
      // dispatch(setOptions([...newData, activeObject.data.jeiId]));
    }
  };

  //radio button 선택 시 실행
  const radioHandler = (event: any) => {
    canvas.getObjects().forEach((obj: any) => {
      if (obj.data) {
        if (
          obj.data?.jeiId !== undefined &&
          obj.data?.jeiId === event.target.value
        ) {
          obj.set("data", {
            ...obj.data,
            answer: 1,
          });
        } else {
          obj.set("data", {
            ...obj.data,
            answer: 0,
          });
        }
      }
    });

    //radio button checked 설정
    setIsChecked(event.target.value);
  };

  //choicelist remove
  const choiceRemoveHandler = (el: any) => {
    const newObject = list.filter((obj: choiceList) => obj.id !== el);
    const newOptions = newData.filter((obj: string) => obj !== el);

    setNewData(newOptions);
    setList(newObject);

    //객체 속성값 제거
    canvas.getObjects().forEach((obj: any) => {
      if (obj.data?.jeiId === el) {
        delete obj.data;
      }
    });
  };

  

  //react-beautiful-dnd
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    //drag and drop 이후 리스트 재정렬
    const _list = JSON.parse(JSON.stringify(list));
    const [targetItem] = _list.splice(source.index, 1);
    _list.splice(destination.index, 0, targetItem);
    setList(_list);

    //options 재졍렬
    
    const opsions = _list.map((el:any) => el.id);
    setNewData(opsions as SetStateAction<string[]>);
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);




  if (!enabled) {
    return null;
  }

  



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        <div
          className="px-2 bg-violet-200 h-8 mt-2 mr-5 cursor-pointer"
          onClick={onAddBtnClick}
        >
          addBtn
        </div>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="flex w-96 gap-x-3">
                {list?.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id!} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div key={index}>
                          <div>No.{index}</div>
                          <img src={el.src}></img>
                          <input
                            type="radio"
                            name="choice"
                            value={el.id}
                            onChange={radioHandler}
                            checked={isChecked === el.id}
                          ></input>
                          <div
                            onClick={() => {
                              choiceRemoveHandler(el.id);
                            }}
                          >
                            remove
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
