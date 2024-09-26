import React, { useState } from "react";

function App() {
  const [inputList, setInputList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addtodo = () => {
    // if (inputList == "") {
    //   alert("plz add some todo");
    // } else {
    //   console.log("list submitted successfully",inputList);
    // }
    setInputList([...inputList, inputValue]); // Add new item to the list.
    setInputValue("");
  };

  return (
    <div className="bg-black h-screen flex flex-col items-center">
      <h1 className="text-white text-5xl flex justify-center pt-5">
        <i class="fa-solid fa-list-check pr-3 pt-1"></i>TODO
      </h1>
      <div className="w-[40rem] h-[35rem] rounded-md left-1/4 border mt-10 overflow-y-scroll">
        <div className="flex justify-center pt-6 ml-5 mr-5 gap-5 sticky top-0 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Add something"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-10 min-w-32 w-[30rem] outline-none rounded-sm p-2 bg-gray-500 text-white placeholder:text-white"
          />
          <button
            className="bg-green-500 text-white min-w-16 text-3xl flex justify-center rounded-md"
            onClick={addtodo}
          >
            +
          </button>
        </div>
        {inputList.map((item, index) => (
          <div className="flex justify-around items-center h-12 border mt-4 ml-10 mr-10">
            <div key={index} className="flex text-lg h-8 w-[25rem] ml-2">
              <h1 className="text-white">{item}</h1>
            </div>
            <div className="w-[7rem] flex justify-evenly">
              <button className="h-10 w-12 text-2xl text-white">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="h-10 w-12 text-2xl text-red-500">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
