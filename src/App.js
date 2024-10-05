
import React, { useState } from "react";
import Footer from "./componnets/Footer";
import Editor from "./componnets/Editor"; // Import your Editor component

const App = () => {
  const [activeLayout, setActiveLayout] = useState(1); // Default layout

  const handleLayoutChange = (layoutId) => {
    setActiveLayout(layoutId); // Update active layout
  };

  return (
    <div className="App">
      <Editor activeLayout={activeLayout} />
      {/* <Footer onLayoutChange={handleLayoutChange} /> */}
    </div>
  );
};

export default App;

