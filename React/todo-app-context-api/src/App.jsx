import { UserContextProvider } from "./contexts/UserContextProvider";
import Input from "./components/Input";
import List from "./components/List";

export default function App() {
  return (
    <UserContextProvider>
      <div className="bg-gray-900 text-white h-screen w-screen flex flex-col justify-center items-center">
        <br />
        <h1 className="text-3xl font-bold underline">TODO</h1>
        <br />
        <div className=" p-4 shadow-lg bg-gray-700 rounded-md text-black min-h-96">
          <Input />
          <br />
          <List />
        </div>
      </div>
    </UserContextProvider>
  );
}
