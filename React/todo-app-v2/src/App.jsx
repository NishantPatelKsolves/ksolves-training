import { FaceIcon, TrashIcon } from "@radix-ui/react-icons";
import AccordionDemo from "./components/AccordionDemo";
import Input from "./components/Input";
import List from "./components/List";
import { useState } from "react";
export default function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <FaceIcon className="w-9" />
      <TrashIcon />
      <AccordionDemo/> */}
      <div className="bg-gray-900 text-white h-screen w-screen flex flex-col justify-center items-center">
        <br />
        <h1 className="text-3xl font-bold underline">TODO</h1>
        <br />
        <div className=" p-4 shadow-lg bg-gray-700 rounded-md text-black min-h-96">
          <Input todos={todos} setTodos={setTodos} />
          <br />
          <List todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
