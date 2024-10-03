import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-purple-950 p-2">
        <ul className="flex gap-3 justify-end items-center flex-wrap md:gap-4">
          <li className="mr-auto">
            <a
              href="/app"
              className="mt-1 text-base font-bold transition-transform hover:scale-110"
            >
              <img src="https://www.lupleg.org/lupleg.svg" alt="" width="150px"/>
            </a>
          </li>
          <li>
            <button className="flex items-center gap-1 border-2 p-2 rounded-md font-semibold transition md:px-4 border-pink-700 text-white hover:bg-pink-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                classNameName="icon icon-tabler icon-tabler-trash"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
              <span className="hidden md:inline-block">Delete</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-1 border-2 p-2 rounded-md font-semibold transition md:px-4 border-purple-700 text-white hover:bg-purple-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M14 4l0 4l-6 0l0 -4"></path>
              </svg>
              <span className="hidden md:inline-block">Save</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-1 border-2 p-2 rounded-md font-semibold transition md:px-4 border-purple-700 bg-purple-700 text-white hover:bg-white hover:text-purple-700 hover:border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 14l11 -11"></path>
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
              </svg>
              <span className="hidden md:inline-block">Submit</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
