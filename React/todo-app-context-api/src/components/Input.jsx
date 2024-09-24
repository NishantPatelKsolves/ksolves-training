import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

const Input = () => {
  const { todos, setTodos } = useContext(UserContext);
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
          let id = Date.now();
          let text = input;
          setTodos([...todos, { id, text }]);
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
