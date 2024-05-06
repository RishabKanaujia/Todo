import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)}
}, [])



  const saveTodoLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAddTodo = () => {
    setTodos([...todos, {id:uuidv4(), todo}]);
    setTodo("");
    saveTodoLS()
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item =>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveTodoLS()
  };
  const handleDeleteAllList = () => {
    setTodos([])
    saveTodoLS()
  };
  const handleEdit = (id) => {
    let editTodo = todos.filter(item =>{
      return item.id === id
    })
    setTodo(editTodo[0].todo)

    let newTodos = todos.filter(item =>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveTodoLS()
  };
  const handleTodoChange = (e) => {
    // console.log("todo change clicked")
    setTodo(e.target.value);
  };
  return (
    <>
      <div className="bg-gradient-to-r from-[#468CB2] to-[#5C79EC] py-10 h-screen">
        <div className="bg-[#232A46] mx-5 h-auto rounded-md">
          <h1 className="text-white text-center text-lg font-semibold py-3">
            Grocery Shopping
          </h1>
          {todos.map((item) => {
            return (
              <div className="flex justify-center items-center pt-5 gap-4" key={item.id}>
                <div className="w-[65%] overflow-x-scroll no-scrollbar rounded-sm text-white bg-gradient-to-r from-[#6B4FFC] to-[#9B55FA] px-1 outline-none">
                  {item.todo}
                </div>
                <button onClick={()=>{ handleDelete(item.id)}}>
                  <RiDeleteBin6Line className="text-white" />
                </button>

                <button onClick={(e)=> handleEdit(item.id)}>
                  <FaRegEdit className="text-white" />
                </button>
              </div>
            );
          })}

          <div className="flex flex-col gap-4 justify-center items-center py-5">
            <div className="rounded-sm flex gap-2 bg-gradient-to-r from-[#6B4FFC] to-[#9B55FA] text-white p-[2px] pr-2">
              <input
                type="text"
                onChange={handleTodoChange}
                checked={todo}
                className="bg-[#232A46] px-1 outline-none text-sm w-[180px]"
                placeholder="Add something to your List"
              />
              <button disabled={todo.length<3} className="disabled:text-[#232A46]" onClick={handleAddTodo}>ADD</button>
            </div>

            <button className="bg-white p-1 px-2 rounded-md text-sm font-medium" onClick={handleDeleteAllList}>
              Delete List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
