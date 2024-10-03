import { useState } from "react";

const Footer = () => {
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click and set active button
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <footer className="bg-purple-950 p-2 flex justify-end gap-2 relative z-40">
      <ul className="flex gap-2">
        <li>
          <button
            title="Left panels"
            onClick={() => handleButtonClick(1)}
            className={`bg-purple-800 p-1 ${
              activeButton === 1 ? "outline outline-purple-50" : ""
            }`}
          >
            <svg
              className="w-4 h-4 fill-purple-300 hover:fill-purple-200"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="30" height="20" x="0" y="0"></rect>
              <rect width="30" height="20" x="0" y="25"></rect>
              <rect width="30" height="20" x="0" y="50"></rect>
              <rect
                width="35"
                height="70"
                x="35"
                y="0"
                className="fill-purple-500"
              ></rect>
            </svg>
          </button>
        </li>
        <li>
          <button
            title="Top panels"
            onClick={() => handleButtonClick(2)}
            className={`bg-purple-800 p-1 ${
              activeButton === 2 ? "outline outline-purple-50" : ""
            }`}
          >
            <svg
              className="w-4 h-4 fill-purple-300 hover:fill-purple-200"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="30" x="0" y="0"></rect>
              <rect width="20" height="30" x="25" y="0"></rect>
              <rect width="20" height="30" x="50" y="0"></rect>
              <rect
                width="70"
                height="35"
                x="0"
                y="35"
                className="fill-purple-500"
              ></rect>
            </svg>
          </button>
        </li>
        <li>
          <button
            title="Left editor"
            onClick={() => handleButtonClick(3)}
            className={`bg-purple-800 p-1 ${
              activeButton === 3 ? "outline outline-purple-50" : ""
            }`}
          >
            <svg
              className="w-4 h-4 fill-purple-300 hover:fill-purple-200"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32.5" height="70" x="0" y="0"></rect>
              <rect
                width="32.5"
                height="70"
                x="35"
                y="0"
                className="fill-purple-500"
              ></rect>
            </svg>
          </button>
        </li>
        <li>
          <button
            title="Full preview"
            onClick={() => handleButtonClick(4)}
            className={`bg-purple-800 p-1 ${
              activeButton === 4 ? "outline outline-purple-50" : ""
            }`}
          >
            <svg
              className="w-4 h-4 fill-purple-300 hover:fill-purple-200"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="70"
                height="70"
                x="0"
                y="0"
                className="fill-purple-500"
              ></rect>
            </svg>
          </button>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
