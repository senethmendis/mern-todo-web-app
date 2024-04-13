import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const Model = ({ onChange, value, onClick, close }) => {
  return (
    <div className="bg-black/15 border border-white/20 py-8 px-6 rounded-2xl relative h-[600px] flex flex-col justify-center items-center backdrop-blur-3xl">
      <AiFillCloseSquare
        onClick={close}
        className="cursor-pointer absolute top-0 -mt-14 left-0 hover:scale-105 transition-all duration-150   "
        size={50}
        width={50}
        height={50}
      />

      <div className="flex flex-col gap-2 justify-start">
        <h2 className="text-2xl">Add New Task</h2>
        <input
          className="text-black px-2 font-semibold h-10 w-[300px] rounded-lg  my-2 outline-white/15"
          type="text"
          onChange={onChange}
          //   onChange={(e) => setNewTodo(e.target.value)}
          value={value}
          //   value={newTodo}
        />
        <button
          onClick={onClick}
          className="hover:shadow-lg hover:shadow-cyan-500/50 rounded-lg h-10 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-700   text-xl font-bold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Model;
