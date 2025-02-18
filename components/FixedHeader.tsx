import React from "react";

function FixedHeader() {
  return (
    <header className="fixed w-full z-50 flex justify-center items-center pt-16 font-monasans font-bold">
      <nav className="rounded-full gap-2 fixed h-12 flex items-center justify-evenly p-8 md:w-3/4 lg:w-2/4 w-full mx-auto backdrop-filter backdrop-blur-lg">
        <a className="bg-white flex w-fit h-fit p-2 rounded-full md:px-6 lg:px-12 text-black items-center cursor-pointer">
          Start
        </a>
        <a className="rounded-full md:px-6 lg:px-12 h-full flex items-center cursor-pointer">
          Services
        </a>
        <a className="rounded-full md:px-6 lg:px-12 h-full flex items-center cursor-pointer">
          Projects
        </a>
        <a className="rounded-full md:px-6 lg:px-12 h-full flex items-center cursor-pointer">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default FixedHeader;
