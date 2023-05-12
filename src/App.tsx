import Toolbar from "./components/toolbar/Toolbar";
import Canvas from "./components/canvas/Canvas";
import Interaction from "./components/interaction/Interaction";
import { createContext, useState } from "react";

function App() {
  const [myValue, setMyValue] = useState()
  return (
    <div>
      <Toolbar />
      <div className="flex">
        <Canvas />
        <Interaction />
      </div>
    </div>
  );
}

export default App;
