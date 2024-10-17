import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Navbar from "./Navbar";
import Footer from "./Footer";

const initialHtml = `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gradient-to-r from-blue-200 to-blue-400 flex justify-center items-center min-h-screen">
    <div class="bg-white text-gray-800 p-10 space-y-6 shadow-xl rounded-lg max-w-md">
      <h1 class="text-2xl font-semibold text-center">Welcome to the CodeCraft Editor</h1>
      <p class="text-center text-lg">Create and test your web snippets here!</p>
      <textarea 
        class="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Write your HTML, CSS, or JavaScript code here...">
      </textarea>
      <button class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
        Run Code
      </button>
      <p class="text-sm text-center text-gray-600 border-t pt-4">
        &copy; 2024 CodeCraft - All rights reserved.
      </p>
    </div>
  </body>
</html>

`;

const initialCss = `
body {
  font-family: 'Inter', sans-serif;
  color: #181028;
  padding: 0;
  margin: 0;
}
`;

const initialJs = `
// Add your JavaScript here
console.log('Hello, from CodeCraft!');
`;

const Editor = () => {
  const [htmlCode, setHtmlCode] = useState(
    localStorage.getItem("htmlCode") || initialHtml
  );
  const [cssCode, setCssCode] = useState(
    localStorage.getItem("cssCode") || initialCss
  );
  const [jsCode, setJsCode] = useState(
    localStorage.getItem("jsCode") || initialJs
  );
  const [activeTab, setActiveTab] = useState("html");
  const [activeLayout, setActiveLayout] = useState(1);
  const [debouncedHtml, setDebouncedHtml] = useState(htmlCode);
  const [debouncedCss, setDebouncedCss] = useState(cssCode);
  const [debouncedJs, setDebouncedJs] = useState(jsCode);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("htmlCode", htmlCode);
      localStorage.setItem("cssCode", cssCode);
      localStorage.setItem("jsCode", jsCode);
    }, 2000);

    return () => clearInterval(interval);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedHtml(htmlCode);
      setDebouncedCss(cssCode);
      setDebouncedJs(jsCode);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const renderEditor = (value, setValue, language) => (
    <CodeMirror
      value={value}
      height="100%"
      theme={oneDark}
      extensions={[language]}
      onChange={(val) => {
        setValue(val);
      }}
    />
  );

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
  };

  const handleLayoutChange = (layout) => {
    setActiveLayout(layout);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Editor and Output */}
      <div className="flex-grow flex min-h-0">
        {/* Layout 1: Vertical editors on the left, output on the right */}
        {activeLayout === 1 && (
          <div className="flex flex-row w-full h-full">
            <div className="w-1/2 bg-gray-800 text-white flex flex-col">
              <h3 className="p-2 font-bold">HTML</h3>
              <div className="flex-none h-1/3 overflow-auto">
                {renderEditor(htmlCode, setHtmlCode, html())}
              </div>
              <h3 className="p-2 font-bold">CSS</h3>
              <div className="flex-none h-1/3 overflow-auto">
                {renderEditor(cssCode, setCssCode, css())}
              </div>
              <h3 className="p-2 font-bold">JavaScript</h3>
              <div className="flex-none h-1/3 overflow-auto">
                {renderEditor(jsCode, setJsCode, javascript())}
              </div>
            </div>
            <div className="w-1/2 p-4 bg-gray-900 overflow-hidden">
              <iframe
                srcDoc={`<html><style>${debouncedCss}</style><body>${debouncedHtml}<script>${debouncedJs}</script></body></html>`}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        )}

        {/* Layout 2: Horizontal editors on top, output at the bottom */}
        {activeLayout === 2 && (
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full bg-gray-800 text-white flex-grow">
              <div className="flex-1 p-2 w-1/3">
                <h2 className="text-lg font-bold">HTML</h2>
                <div
                  className="flex-grow overflow-auto"
                  style={{ height: "200px" }}
                >
                  {renderEditor(htmlCode, setHtmlCode, html())}
                </div>
              </div>
              <div className="flex-1 p-2 w-1/3">
                <h2 className="text-lg font-bold">CSS</h2>
                <div
                  className="flex-grow overflow-auto"
                  style={{ height: "200px" }}
                >
                  {renderEditor(cssCode, setCssCode, css())}
                </div>
              </div>
              <div className="flex-1 p-2 w-1/3">
                <h2 className="text-lg font-bold">JavaScript</h2>
                <div
                  className="flex-grow overflow-auto"
                  style={{ height: "200px" }}
                >
                  {renderEditor(jsCode, setJsCode, javascript())}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-900 overflow-hidden flex-grow-0">
              <iframe
                srcDoc={`<html><style>${debouncedCss}</style><body>${debouncedHtml}<script>${debouncedJs}</script></body></html>`}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="300"
              />
            </div>
          </div>
        )}

        {/* Layout 3: Tabs for switching between editors */}
        {activeLayout === 3 && (
          <div className="flex flex-row w-full">
            <div className="w-1/2 bg-gray-800 text-white flex flex-col min-h-0">
              <div className="flex bg-gray-900 p-4 space-x-4">
                <div className="flex space-x-2 border-[3px] border-purple-400 rounded-xl select-none">
                  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                    <input
                      type="radio"
                      name="radio"
                      value="html"
                      className="peer hidden"
                      checked={activeTab === "html"}
                      onChange={handleTabChange}
                    />
                    <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                      HTML
                    </span>
                  </label>
                  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                    <input
                      type="radio"
                      name="radio"
                      value="css"
                      className="peer hidden"
                      checked={activeTab === "css"}
                      onChange={handleTabChange}
                    />
                    <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                      CSS
                    </span>
                  </label>
                  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                    <input
                      type="radio"
                      name="radio"
                      value="js"
                      className="peer hidden"
                      checked={activeTab === "js"}
                      onChange={handleTabChange}
                    />
                    <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
                      JavaScript
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex-grow">
                {activeTab === "html" &&
                  renderEditor(htmlCode, setHtmlCode, html())}
                {activeTab === "css" &&
                  renderEditor(cssCode, setCssCode, css())}
                {activeTab === "js" &&
                  renderEditor(jsCode, setJsCode, javascript())}
              </div>
            </div>
            <div className="w-1/2 p-4 bg-gray-900 overflow-hidden">
              <iframe
                srcDoc={`<html><style>${debouncedCss}</style><body>${debouncedHtml}<script>${debouncedJs}</script></body></html>`}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        )}

        {/* Layout 4: Output only */}
        {activeLayout === 4 && (
          <div className="w-full h-full bg-gray-900 overflow-hidden">
            <iframe
              srcDoc={`<html><style>${debouncedCss}</style><body>${debouncedHtml}<script>${debouncedJs}</script></body></html>`}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onLayoutChange={handleLayoutChange} />
    </div>
  );
};

export default Editor;
