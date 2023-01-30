import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="h-16 text-white">
      <div className="max-w-6xl w-11/12 mx-auto h-full flex justify-between items-center ">
        <div
          className="flex items-center h-full cursor-pointer "
          onClick={() => (window.location.href = "/")}
          title="Home page"
        >
          <h1 className="text-2xl md:text-2xl font-bold">Typed Svg</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
