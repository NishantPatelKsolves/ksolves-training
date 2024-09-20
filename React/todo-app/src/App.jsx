import { useState } from "react";
import Input from "./components/Input";
import List from "./components/List";

export default function App() {
  const [todos, setTodos] = useState([]);
  return (
    <div className="bg-gray-900 text-white h-screen w-screen flex flex-col justify-center items-center">
      <br />
      <h1 className="text-3xl font-bold underline">TODO</h1>
      <br />
      <div className=" p-4 shadow-lg bg-gray-700 rounded-md text-black">
        <Input todos={todos} setTodos={setTodos} />
        <br />
        <List todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
}
