import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import Navbar from './Navbar';
import Footer from './Footer';

const initialHtml = `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-purple-100 flex justify-center items-center min-h-screen">
    <div class="bg-white text-[#181028] p-8 space-y-6 shadow-lg rounded-xl max-w-md md:max-w-lg">
      <img class="w-44" src="https://www.lupleg.org/lupleg.svg" />
      <p class="text-lg">Welcome to the Lupleg<b> Web</b> Editor!</p>
      <p class="flex gap-2 font-medium text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l5 5l10 -10"></path>
        </svg>
        Use your innovation to improve your development! ✅
      </p>
      <p class="text-sm border-t pt-6">This example uses TailwindCSS by adding the CDN in the head tag.</p>
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
console.log('Hello, from Lupleg!');
`;

const Editor = () => {
  const [htmlCode, setHtmlCode] = useState(localStorage.getItem('htmlCode') || initialHtml);
  const [cssCode, setCssCode] = useState(localStorage.getItem('cssCode') || initialCss);
  const [jsCode, setJsCode] = useState(localStorage.getItem('jsCode') || initialJs);
  const [activeTab, setActiveTab] = useState('html');
  const [activeLayout, setActiveLayout] = useState(1); // 1 for layout 1

  // Autosave to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('htmlCode', htmlCode);
      localStorage.setItem('cssCode', cssCode);
      localStorage.setItem('jsCode', jsCode);
    }, 2000); // Autosave every 2 seconds

    return () => clearInterval(interval);
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
{activeLayout === 1 && (
  <div className="flex flex-row w-full h-full">
    <div className="w-1/2 bg-gray-800 text-white flex flex-col">
      {/* HTML Editor */}
      <h3 className="p-2 font-bold">HTML</h3>
      <div className="flex-none h-1/3 overflow-auto">
        
        {renderEditor(htmlCode, setHtmlCode, html())}
      </div>
      {/* CSS Editor */}
      <h3 className="p-2 font-bold">CSS</h3>
      <div className="flex-none h-1/3 overflow-auto">
        
        {renderEditor(cssCode, setCssCode, css())}
      </div>
      {/* JavaScript Editor */}
      <h3 className="p-2 font-bold">JavaScript</h3>
      <div className="flex-none h-1/3 overflow-auto">
        
        {renderEditor(jsCode, setJsCode, javascript())}
      </div>
    </div>
    <div className="w-1/2 p-4 bg-gray-900 overflow-hidden">
      {/* <h2 className="text-lg mb-2 font-bold text-white">Output</h2> */}
      <iframe
        srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}<script>${jsCode}</script></body></html>`}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  </div>
)}


{activeLayout === 2 && (
  <div className="flex flex-col w-full h-full">
    {/* Editors Container */}
    <div className="flex w-full bg-gray-800 text-white flex-grow">
      {/* HTML Editor */}
      <div className="flex-1 p-2 w-1/3">
        <h2 className="text-lg font-bold">HTML</h2>
        <div className="flex-grow overflow-auto" style={{ height: '200px' }}>
          {renderEditor(htmlCode, setHtmlCode, html())}
        </div>
      </div>

      {/* CSS Editor */}
      <div className="flex-1 p-2 w-1/3">
        <h2 className="text-lg font-bold">CSS</h2>
        <div className="flex-grow overflow-auto" style={{ height: '200px' }}>
          {renderEditor(cssCode, setCssCode, css())}
        </div>
      </div>

      {/* JavaScript Editor */}
      <div className="flex-1 p-2 w-1/3">
        <h2 className="text-lg font-bold">JavaScript</h2>
        <div className="flex-grow overflow-auto" style={{ height: '200px' }}>
          {renderEditor(jsCode, setJsCode, javascript())}
        </div>
      </div>
    </div>

    {/* Output Section */}
    <div className="p-4 bg-gray-900 overflow-hidden flex-grow-0">
      <iframe
        srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}<script>${jsCode}</script></body></html>`}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="300"
      />
    </div>
  </div>
)}





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
              checked={activeTab === 'html'}
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
              checked={activeTab === 'css'}
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
              checked={activeTab === 'js'}
              onChange={handleTabChange}
            />
            <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
              JavaScript
            </span>
          </label>
        </div>
      </div>

      {/* CodeMirror Editor */}
      <div className="flex-grow p-4 min-h-0 overflow-auto">
        {activeTab === 'html' && renderEditor(htmlCode, setHtmlCode, html())}
        {activeTab === 'css' && renderEditor(cssCode, setCssCode, css())}
        {activeTab === 'js' && renderEditor(jsCode, setJsCode, javascript())}
      </div>
    </div>
    
    <div className="w-1/2 p-4 bg-gray-900 overflow-hidden">
      {/* <h2 className="text-lg mb-2 font-bold text-white">Output</h2> */}
      <iframe
        srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}<script>${jsCode}</script></body></html>`}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  </div>
)}


{activeLayout === 4 && (
  <div className="flex flex-col w-full h-full p-4 bg-gray-900">
    {/* <h2 className="text-lg mb-2 font-bold text-white">Output</h2> */}
    <div className="overflow-hidden h-full" >
      <iframe
        srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}<script>${jsCode}</script></body></html>`}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  </div>
)}

      </div>

      {/* Footer */}
      <Footer onLayoutChange={handleLayoutChange} />
    </div>
  );
};

export default Editor;
