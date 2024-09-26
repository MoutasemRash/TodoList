import React, { useMemo } from 'react'
import Task from '../Task/Task'
import './columnPage.css'
import { useStore } from '../../store.js'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import TaskPage from '../TaskPage/TaskPage.jsx'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


const ColumnPage = ({state}) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [hideForm,setHideForm] = useState(true);
  const tasks = useStore((store)=>store.Tasks)
  const addTask = useStore((store)=>store.addTask)
  const navigate = useNavigate();


const filteredTasks = useMemo(()=>{
   const newTasks =  tasks.filter((task)=>task.state===state);
   return newTasks
  },[tasks])

  const TasksElements = filteredTasks.map((task)=>(<TaskPage id={task.id} key={task.id}/>))


  return (
    <>
      <div className="back-btn">
        <span onClick={()=>navigate(-1)}>
          <FaArrowLeft />
        </span>
      </div>
    <div className="columnPage-container">
    <div className="columnPage">
      <div className="column-state">
        <button className={classNames('column-state-btn',state)}>
        {state}
        </button>        
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
    </div>

    </>

  )
}

export default ColumnPage

