import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import Navbar from './Navbar';
import Footer from './Footer';

const initialHtml = `<!-- Add your Html code here --> \n<html>\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <script src="https://cdn.tailwindcss.com"></script>\n  </head>\n  <body class="bg-purple-100 flex justify-center items-center min-h-screen">\n    <div class="bg-white text-[#181028] p-8 space-y-6 shadow-lg rounded-xl max-w-md md:max-w-lg">\n      <img class="w-44" src="https://www.lupleg.org/lupleg.svg" />\n      <p class="text-lg">Welcome to the Lupleg<b> Web</b> Editor!</p>\n      <p class="flex gap-2 font-medium text-lg">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\n          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\n          <path d="M5 12l5 5l10 -10"></path>\n        </svg>\n        Use your innovation to improve your development! ✅\n      </p>\n      <p class="text-sm border-t pt-6">This example uses TailwindCSS by adding the CDN in the head tag.</p>\n    </div>\n  </body>\n</html>`;

const initialCss = `/* Add your CSS here */\nbody {\n  font-family: 'Inter', sans-serif;\n  color: #181028;\n  padding: 0;\n  margin: 0;\n}`;

const initialJs = `// Add your JavaScript here\nconsole.log('Hello, from Lupleg!');`;

const Editor = () => {
  const [htmlCode, setHtmlCode] = useState(localStorage.getItem('htmlCode') || initialHtml);
  const [cssCode, setCssCode] = useState(localStorage.getItem('cssCode') || initialCss);
  const [jsCode, setJsCode] = useState(localStorage.getItem('jsCode') || initialJs);
  const [activeTab, setActiveTab] = useState('html');

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

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Editor and Output */}
      <div className="flex-grow flex min-h-0">
        {/* Sidebar for tab buttons and editors */}
        <div className="w-1/2 bg-gray-800 text-white flex flex-col min-h-0">
          <div className="flex bg-gray-900 p-4 space-x-4">
            {/* Replacing buttons with styled radio buttons */}
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

          {/* CodeMirror Editor with scroll */}
          <div className="flex-grow p-4 min-h-0 overflow-hidden">
            <div className="overflow-y-auto h-full overflow-x-hidden scrollbar-hidden">
              {activeTab === 'html' && renderEditor(htmlCode, setHtmlCode, html())}
              {activeTab === 'css' && renderEditor(cssCode, setCssCode, css())}
              {activeTab === 'js' && renderEditor(jsCode, setJsCode, javascript())}
            </div>
          </div>
        </div>

        {/* Output screen (live preview) */}
        <div className="w-1/2 bg-gray-900 text-white p-4 overflow-hidden">
          <h2 className="text-lg mb-2 font-bold">Output</h2>
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

      {/* Footer */}
      <Footer />

      {/* Add your CSS here */}
      <style>{`
        /* Hide both scrollbars for Chrome, Safari, and Opera */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none; /* Hides the scrollbar */
        }

        /* Hide both scrollbars for IE and Edge */
        .scrollbar-hidden {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;      /* Firefox */
        }

        /* Prevent horizontal scrolling */
        .scrollbar-hidden {
          overflow-x: hidden; /* Prevent horizontal scrolling */
        }
      `}</style>
    </div>
  );
};

export default Editor;
