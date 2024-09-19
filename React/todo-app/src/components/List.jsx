import React from "react";

const List = ({ todos }) => {
  return (
    <div>
      <ul>
        {todos.map((e) => {
          return (
            <li key={Math.random() * 100} className="text-white p-2">
              {e}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
