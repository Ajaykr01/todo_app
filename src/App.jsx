import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputList, setInputList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the todo being edited
  const [editValue, setEditValue] = useState(""); // Track the new value for the todo

  const addTodo = () => {
    if (inputValue.trim() === "") {
      alert("Please add some todo");
    } else {
      setInputList([...inputList, inputValue]);
      setInputValue(""); // Clear the input field
    }
  };

  const deleteTask = (index) => {
    const newInputList = inputList.filter((_, i) => i !== index);
    setInputList(newInputList); // Update state with the new list
  };

  const startEditing = (index) => {
    setEditIndex(index); // Set the index of the todo to edit
    setEditValue(inputList[index]); // Set the edit value to the current todo text
  };

  const saveEdit = () => {
    const updatedList = inputList.map((item, i) =>
      i === editIndex ? editValue : item
    );
    setInputList(updatedList); // Update the todo list with the edited item
    setEditIndex(null); // Reset the editing state
    setEditValue(""); // Clear the edit value
  };

  return (
    <div className="bg-black h-screen flex flex-col items-center">
      <h1 className="text-white text-5xl flex justify-center pt-5">
        <i className="fa-solid fa-list-check pr-3 pt-1"></i>TODO
      </h1>
      <div className="w-[40rem] h-[35rem] rounded-md left-1/4 border mt-10 overflow-y-scroll custom-scroll">
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
            onClick={addTodo}
          >
            +
          </button>
        </div>
        {inputList.map((item, index) => (
          <div
            key={index}
            className="flex justify-around items-center h-12 border mt-4 ml-10 mr-10"
          >
            <div className="flex text-lg w-[25rem] ml-2">
              {editIndex === index ? (
                // If we are editing this item, show an input field
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-[25rem] bg-white text-black outline-none rounded-sm"
                />
              ) : (
                <h1 className="text-white">{item}</h1>
              )}
            </div>
            <div className="w-[7rem] flex justify-evenly">
              {editIndex === index ? (
                <button
                  className="h-10 w-12 text-2xl text-white"
                  onClick={saveEdit} // Call saveEdit to update the todo
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              ) : (
                <button
                  className="h-10 w-12 text-2xl text-white"
                  onClick={() => startEditing(index)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              )}
              <button
                className="h-10 w-12 text-2xl text-red-500"
                onClick={() => deleteTask(index)} // Call deleteTask with the current index
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
