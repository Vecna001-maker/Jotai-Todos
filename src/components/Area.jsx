import React from 'react'
import todoAtom from '../lib/atom'
import { useAtom } from 'jotai'
import { useRef } from 'react'
import { useEffect } from 'react'

const Area = () => {

    const inputRef = useRef();

    const [todos,setTodos] = useAtom(todoAtom);
    console.log("rerender");

    const handleClick = (e)=>{
         e.preventDefault();
         console.log(inputRef.current.value);


         if(inputRef.current.value != ""){

           const obj = {
            id:Date.now(),
            data:inputRef.current.value
           }
           setTodos((prev)=>[...prev,obj])
           inputRef.current.value = "";
           console.log(todos);
           localStorage.setItem('todos',JSON.stringify(todos));

         }
    }

    const handleDelete = (id)=>{
        console.log("dlt");
        //e.preventDefault();

        let newTodos = todos.filter((todo)=>{
            if(todo.id !== id){
                return todo;
            }
        })

        setTodos(newTodos);
        localStorage.setItem('todos',JSON.stringify(newTodos));
    }


    useEffect(()=>{
        const td = JSON.parse(localStorage.getItem('todos'));
        if(td){
          setTodos(td);
        }
    },[]);

  return (
    <>
    <div className='flex flex-col items-center h-screen'>
      <h1 className='text-2xl my-4'><b>Todos:</b></h1>
      <div className='my-3 flex '>
        <input ref={inputRef} type='text' id='todo' className='w-80 mr-2 border border-solid border-black' placeholder='add your todo'></input>
        <button onClick={handleClick} className='bg-slate-900 text-white rounded-md h-9 w-10'>Add</button>
      </div>
      <h1 className='mt-3'>Your Todos:</h1>
      <div className='w-2/3 min-h-11 p-2 flex flex-col items-center m-0 border border-solid border-black bg-slate-300'>
        {todos.map((todo)=>{
            return <div key={todo.id} className='w-80 border p-2 border-solid border-black my-1 min-h-3 flex justify-between'>
                {todo.data}
                <button onClick={()=>{handleDelete(todo.id)}} className='bg-red'><img className='w-5 h-5' src="/icons8-delete-30.png" /></button>
            </div>
        })}
      </div>
    </div>
    </>
  )
}

export default Area