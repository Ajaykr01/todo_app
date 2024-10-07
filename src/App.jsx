import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputList, setInputList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("All");

  
  const addTodo = () => {
    if (inputValue.trim() === "") {
      alert("Please add some todo");
    } else {
      setInputList([...inputList, { task: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const deleteTask = (index) => {
    const newInputList = inputList.filter((_, i) => i !== index); // _ --> Track the item being inserted over, "i ! == index" --> items whose indices don't match the passed index are kept.
    setInputList(newInputList);
  };

  const toggleCompletion = (index) => {
    const updatedList = inputList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setInputList(updatedList);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(inputList[index].task);
  };

  const saveEdit = () => {
    const updatedList = inputList.map(
      (item, i) => (i === editIndex ? { ...item, task: editValue } : item) //creates a new object with all the existing properties from item but updates the task property with the new value (editValue).
    );
    setInputList(updatedList);
    setEditIndex(null);
    setEditValue("");
  };

  const filteredTodos = inputList.filter((todo) => {
    if (filter === "Completed") {
      return todo.completed;
    }
    if (filter === "Incomplete") {
      return !todo.completed;
    }
    return true;
  });

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
            onClick={()=>{
              addTodo()
              localStorage.setItem("task1",inputValue)
            }}
          >
            +
          </button>
          <select
            className="rounded-md bg-pink-500 text-white outline-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        {/* Display filtered todos */}
        {filteredTodos.map((item, index) => (
          <div
            key={index}
            className="flex justify-around items-center h-12 border mt-4 ml-5 mr-5"
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleCompletion(index)}
            />
            <div className="flex text-lg w-[26rem]">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-[25rem] bg-white text-black outline-none rounded-sm"
                />
              ) : (
                <h1
                  className="text-white"
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </h1>
              )}
            </div>
            <div className="w-[7rem] flex justify-evenly">
              {editIndex === index ? (
                <button
                  className="h-10 w-12 text-2xl text-white"
                  onClick={saveEdit}
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
