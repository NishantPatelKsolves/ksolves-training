import React, { useState } from "react";

const Input = ({ todos, setTodos }) => {
  const [input, setInput] = useState("");
  return (
    <div className="p-4 shadow-lg bg-gray-650 rounded-md text-black">
      <input
        type="text"
        name="todo"
        id="todo"
        className="p-2 rounded-s-md"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        className="bg-orange-500 text-black p-2 rounded-e-md"
        onClick={() => {
          setTodos([...todos, input]);
          setInput("");
        }}
      >
        Add
      </button>
      {input}
    </div>
  );
};

export default Input;
