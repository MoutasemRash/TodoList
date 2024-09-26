import React, { useMemo } from 'react'
import './column.css'
import Task from '../Task/Task'
import { useStore } from '../../store.js'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'


const Column = ({state}) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [hideForm,setHideForm] = useState(true);
  const [drag,setDrag] = useState(false)
  const tasks = useStore((store)=>store.Tasks)
  const addTask = useStore((store)=>store.addTask)
  const dragTask = useStore((store)=>store.DragTask)
  const moveTask = useStore((store)=> store.moveTask)
  const setDragTask = useStore((store)=>store.setDragTask)
 

const filteredTasks = useMemo(()=>{
   const newTasks =  tasks.filter((task)=>task.state===state);
   return newTasks
  },[tasks])


 

  const TasksElements = filteredTasks.map((task)=>(<Task id={task.id} key={task.id}/>))


  return (
    <div className={classNames('column',{dragable:drag})} 
    onDragOver={(e)=>{
      e.preventDefault()
      setDrag(true)
    }}
    onDragLeave={()=>setDrag(false)}
    onDrop={()=>{
      moveTask(state,dragTask)
      setDragTask(null)
      setDrag(false)
    }}>
      <div className="column-state">
        <NavLink to={`/${state}`}>
          <button className={classNames('column-state-btn',state)}>
          {state}
          </button>
        </NavLink>          
      </div>
      <div className="column-tasks">
          {TasksElements}
      </div>
      
      
    {state==="PLANING"&&<>
        <div className="show-form-btn">
          <button onClick={()=>setHideForm(prev=>!prev)}>
         +add new Task
        </button>
        </div>
        <form className={classNames('column-add-task-form',{hideForm:hideForm})} onSubmit={(e)=>{
        e.preventDefault()
        const id = Date()
        setTitle('')
        setDescription('')
        const today = dayjs()
        const day = today.format('D');
        const month = today.format('M') ;
        const year = today.format('YYYY');
      
        addTask(title,description, {day,month,year},id)
        setHideForm(true)
      }}>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <textarea className='description-input' value={description} name="" id=""
         onChange={(e)=>setDescription(e.target.value)} placeholder='Description'></textarea>

        
        <button>Submit</button>

      </form></>}
    </div>

  )
}

export default Column
