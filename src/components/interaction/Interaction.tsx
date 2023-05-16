import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setOptions } from "../../slices/slice";

type choiceList = {
  id: string | undefined;
  src: string | undefined;
  answer: 0 | 1;
};

export default function Interaction() {
  const [list, setList] = useState<choiceList[]>([]);
  const [newData, setNewData] = useState<string[]>([]);
  const { activeObject, canvas } = useSelector(
    (state) => (state as any).authoring
  );

  //localstorage에서 가져온 options list
  const optionsItem = localStorage.getItem("options");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!canvas || !optionsItem || newData.length !== 0) return;

    //추가한 List 띄우기
    const jsonData = localStorage.getItem("canvasData");
    const list = [];
    if (jsonData) {
      const canvasData = JSON.parse(jsonData);
      for (let i = 0; i < canvasData.objects.length; i++) {
        if (canvasData.objects[i].data) {
          //업데이트 된 이미지로 바꿔주기          
          list.push({
            id: canvasData.objects[i].data.jeiId,
            src: canvasData.objects[i].data.src,
            answer: canvasData.objects[i].data.answer,
          });
        }

        //순서 정렬
        if (list.length !== 0) {
          const newList = list.sort((next, curr) => {
            const currArrNum = newData.indexOf(curr.id);
            const nextArrNum = newData.indexOf(next.id);
            return nextArrNum - currArrNum;
          });
          setList(newList);
        }

        // RadioButton 초기 설정
        const selectedChoice = list.find((el) => el.answer === 1);
        selectedChoice && setIsChecked(selectedChoice.id);
      }
    }
  }, [canvas, newData, optionsItem]);

  useEffect(() => {
    if (!optionsItem) return;
    //순서 리스트 options 초기 설정 > newData로 관리
    setNewData(optionsItem?.split(","));
  }, [optionsItem]);

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

  const [isChecked, setIsChecked] = useState(list[0]?.id);

  return (
    <div className="flex">
      <div className="px-2 bg-violet-200 h-8 mt-2 mr-5" onClick={onAddBtnClick}>
        addBtn
      </div>
      <div className="flex w-96 gap-x-3">
        {list?.map((el, index) => (
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
        ))}
      </div>
    </div>
  );
}
