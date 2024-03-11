import Message from './components/Message'
import { useState } from 'react'

function App() {
 
const [tasks,settasks]=useState<number[]>([])
const [todo, setTodo]=useState('')
  return (
  <div className='w-screen h-screen flex flex-col justify-center items-center '>
  <form action="" className='flex'> 
   <input value={todo} onChange={(e)=>setTodo(e.target.value)}  type="text" className='border border-gray-300 rounded-sm active:border-gray-400 focus:outline-none text-gray-600 text-[18px] py-1 px-2 ' />
   <button onClick={(e)=>{
    e.preventDefault();
    settasks((prev)=>([...prev,todo]))
    setTodo('')
    }} className='py-2 px-8 border rounded-sm bg-gray-300'>Add</button></form>
    <Message name='sandra'  >hello</Message>
    <ul className='w-[40%] text-center flex flex-col gap-3'>
     {tasks.map((item,index)=> ( <li key={index} className='w-full rouded-md bg-gray-100 border p-2 cursor-pointer shadow-md ' >{item}</li>))}
    </ul>
 </div> )
}

export default App
