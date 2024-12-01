import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [Finished,setFinished] = useState(true);

  useEffect(()=>{
          let todostring=localStorage.getItem("todos")
          if(todostring)
          {
          let todos=JSON.parse(localStorage.getItem("todos"))
          setTodos(todos)
          }

  },[])

  const togglefinished=()=>{
    setFinished(!Finished);
  }

  const savetoLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleUp = (id) => {
    const index = todos.findIndex((item) => item.id === id);
    if (index === 0) return; // Already at the top
    const updatedTodos = [...todos];
    [updatedTodos[index - 1], updatedTodos[index]] = [updatedTodos[index], updatedTodos[index - 1]];
    setTodos(updatedTodos);
    savetoLS();
  };
  
  const handleDown = (id) => {
    const index = todos.findIndex((item) => item.id === id);
    if (index === todos.length - 1) return; // Already at the bottom
    const updatedTodos = [...todos];
    [updatedTodos[index + 1], updatedTodos[index]] = [updatedTodos[index], updatedTodos[index + 1]];
    setTodos(updatedTodos);
    savetoLS();
  };
  
  
  const handleEdit=(e,id)=>{
 
    let newTodo = todos.filter(item=> item.id ===id)
    setTodo(newTodo[0].todo);


    let newTodos = todos.filter((item)=>{
      return item.id !==id;
    })

    setTodos(newTodos);
    savetoLS();
      
  }
  const handleDelete=(e,id)=>{
    
      
      let newTodos = todos.filter((item)=>{
        return item.id !==id;
      })

      setTodos(newTodos);
      savetoLS();
      
  }
  const handleAdd=()=>{
         setTodos([...todos,{id :uuidv4(),todo, isCompleted: false}])  //q
         setTodo('')  // q & q on map return .
         savetoLS();
  }

  const handleChange=(e)=>{
         setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
        let id=e.target.name;
        let index=todos.findIndex(item=>{
          return item.id ===id;
        })
          let newTodos = [...todos];   //q
          newTodos[index].isCompleted = !newTodos[index].isCompleted;
          setTodos(newTodos);
          savetoLS();
          }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-xl text-center'>iTASK - YOUR OWN TASK PLANNER</h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className="text-lg font-bold ">Add a Todo</h2>
             <div className="flex">
          <input onChange={handleChange} value={todo || ""}type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 p-2 py-1 text-sm font-bold text-white rounded-md mx-2 '>Save</button>
          </div>
        </div>

          <input className='my-4 mx-1 p-1'onChange={togglefinished}type ="checkbox" checked={Finished} />Show Finished
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
          <h2 className="text-lg font-bold">Your Todos</h2>

          <div className="todos">
            {todos.length===0 && <div className='m-5'>No todos to display</div>}
            {todos.map(item=>{

         
           return  (!Finished || item.isCompleted) && <div key={item.id}className="todo flex  my-3 justify-between"> 
           <div className="flex gap-5 ">
            <input name ={item.id}onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
             <div className={item.isCompleted?"line-through":""}>{item.todo}
             </div>
             </div>
             <div className="buttons flex h-full ">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaEdit/></button>
              <button onClick={()=>handleUp(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaArrowUp/></button>
              <button onClick={()=>handleDown(item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaArrowDown/></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'>< MdDelete /></button>
            
             </div>
            </div>
               })}
          </div>
        </div>
      
    </>
  );
}

export default App;
