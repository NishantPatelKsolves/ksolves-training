import { Pencil2Icon } from "@radix-ui/react-icons";
import React from "react";

const List = ({ todos, setTodos }) => {
  return (
    <div className="w-full bg-white p-2 rounded-sm min-h-96">
      <ul>
        {todos.map((t) => {
          return (
            <li
              key={t.id}
              className="text-black bg-gray-300 p-2 m-2 rounded-sm w-full grid grid-cols-4"
            >
              <input
                type="checkbox"
                name="status"
                id={`status-${t.id}`}
                className="w-5 hover:cursor-pointer col-start-1 col-end-2 col-span-1"
                checked={t.status}
                onClick={(e) => {
                  let updatedTodos = todos.map((element) => {
                    if (element.id === t.id) {
                      return { ...element, status: e.target.checked };
                    }
                    return element; // Return unchanged todo
                  });
                  setTodos(updatedTodos);
                }}
              />
              <div className="text-black bg-gray-300 flex justify-between col-start-2 col-end-4 col-span-2">
                {t.toEdit ? (
                  <>
                    <input
                      type="text"
                      name="forEdit"
                      id={t.id}
                      value={t.text}
                      onChange={(e) => {
                        let updatedTodos = todos.map((element) => {
                          if (element.id === t.id) {
                            return { ...element, text: e.target.value };
                          }
                          return element; // Return unchanged todos
                        });
                        setTodos(updatedTodos);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        let updatedTodos = todos.map((element) => {
                          if (element.id === t.id) {
                            let edit = element.toEdit ? false : true;
                            return { ...element, toEdit: edit };
                          }
                          return element; // Return unchanged todos
                        });
                        setTodos(updatedTodos);
                      }}
                    >
                      save
                    </button>
                  </>
                ) : (
                  <p>{t.text}</p>
                )}
                <Pencil2Icon
                  onClick={(e) => {
                    let updatedTodos = todos.map((element) => {
                      if (element.id === t.id) {
                        let edit = element.toEdit ? false : true;
                        return { ...element, toEdit: edit };
                      }
                      return element; // Return unchanged todos
                    });
                    setTodos(updatedTodos);
                  }}
                />
              </div>
              <button
                className="col-start-4 col-end-5 col-span-1"
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
