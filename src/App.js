
import React, { useState } from "react";
import Editor from "./componnets/Editor"; 


const App = () => {
  const [activeLayout, setActiveLayout] = useState(1);
  return (
    <div className="App overflow-hidden">
      <Editor activeLayout={activeLayout} />
    </div>
  );
};

export default App;

