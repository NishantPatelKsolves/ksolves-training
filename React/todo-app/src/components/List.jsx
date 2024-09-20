import React from "react";

const List = ({ todos, setTodos }) => {
  return (
    <div className="w-full bg-white p-2 rounded-sm">
      <ul>
        {todos.map((t) => {
          return (
            <li
              key={t.id}
              className="text-black bg-gray-300 p-2 m-2 rounded-sm flex justify-between"
            >
              <p>{t.text}</p>
              <button
                onClick={() => {
                  const filteredTodos = todos.filter((f) => f.id != t.id);
                  setTodos([...filteredTodos]);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
