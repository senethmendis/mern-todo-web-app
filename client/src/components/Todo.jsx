import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Todo = ({ text, complete, onClick, deleteOnClick }) => {
  return (
    <div
      onClick={onClick}
      className=" flex gap-5 transition-all duration-105 hover:scale-105  bg-black/20  border border-white/20 justify-start items-center py-2 px-3 rounded-lg"
    >
      <div className="flex items-center gap-6 justify-between w-full">
        <p
          className={`${
            complete ? "line-through" : ""
          } text-xl md:text-2xl text-white flex items-center py-1`}
        >
          {text}
        </p>

        <div className="flex gap-5">
          <input type="checkbox" name="" id="" />
          <button onClick={deleteOnClick}>
            <RiDeleteBin6Fill size={20} color="ff0054" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
