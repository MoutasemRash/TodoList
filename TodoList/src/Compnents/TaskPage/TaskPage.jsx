import React from 'react'
import './taskPage.css'
import { FaRegTrashAlt } from "react-icons/fa";
import { useStore } from '../../store.js'
import classNames from 'classnames';
import { useState } from 'react';

const TaskPage = ({id}) => {
 const [modle,setModle] = useState(false);
const task = useStore((store)=>store.Tasks.find((task)=>task.id===id))
const [editable,setEditable] = useState(false)
const [ newTitle ,setNewTitle] = useState(task.title)
const [ newDescription,setNewDescription] = useState(task.description)
 const deleteTask = useStore((store)=>store.deleteTask)

 const updateTask = useStore((store)=>store.updateTask)

 const toggleEdit = ()=>{
  if(editable)
    setModle(false)

  setEditable(prev=>!prev)
  
 }
  return (
    <div className="taskPage">
      <div className="taskPage-header">
        <div className="taskPage-title" contentEditable={editable}
         onInput={(e)=>{setNewTitle(e.target.innerHTML)}}>
          {task.title}
        </div>
        <div className="taskPage-delete-btn" onClick={()=>{
          deleteTask(id)
        }}>
          <FaRegTrashAlt />
        </div>
      </div>
      <div className="taskPage-description" contentEditable={editable}
      onInput={(e)=>{setNewDescription(e.target.innerHTML)}}>
        {task.description}
      </div>
      <hr />
      <div className="taskPage-footer">
          <div className="taskPage-date">
           { task.date.day +' / '+ task.date.month +' / ' +task.date.year}
          </div>
          <div className="taskPage-edit-btn">
            <span onClick={()=>{
            if(editable){
              updateTask(newTitle,newDescription,id)
            }
            toggleEdit()

            }}>
              {editable?'Save':'Edit'}
            </span>
          </div>
      </div>
    </div>
  )
}

export default TaskPage

