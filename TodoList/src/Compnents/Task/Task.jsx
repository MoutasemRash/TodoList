import React, { useEffect, useState } from 'react'
import './task.css'
import { useStore } from '../../store'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import classNames from 'classnames';

const Task = ({id}) => {
const [modle,setModle] = useState(false);
const task = useStore((store)=>store.Tasks.find((task)=>task.id===id))
const [editable,setEditable] = useState(false)
const [ newTitle ,setNewTitle] = useState(task.title)
const [ newDescription,setNewDescription] = useState(task.description)
const [warrning,setWarrning] = useState(false)
 const deleteTask = useStore((store)=>store.deleteTask)
 const moveTask = useStore((store)=>store.moveTask);
 const updateTask = useStore((store)=>store.updateTask);
 const setDragTask = useStore((store)=>store.setDragTask)
 const dragTask = useStore((store)=>store.DragTask)

 const toggleEdit = ()=>{
  if(editable)
    setModle(false)

  setEditable(prev=>!prev)
  
 }
  const toggleModle = () =>{
    if(editable)
      setWarrning(true)
 
    setModle(prev=>!prev)
  }

  return (
    <>
    <div className='task' draggable onDragStart={()=>{
      setDragTask(id)
      }}
      onDragEnd={()=>{
        setDragTask(null)
      }}>
      <div className="task-header">
        <div className="task-title">
          {task.title}
        </div>
        <span className="delete-task-btn" onClick={()=>{
          deleteTask(id)
        }}>
          <FaRegTrashAlt />
        </span>
      </div>
      <div className="task-buttons">
       {task.state!=='PLANING'&&
       <span className='left-arrow' onClick={()=>{
        task.state==="DONE"&&moveTask('ONGOING',id)
        task.state==="ONGOING"&&moveTask('PLANING',id)}}>
          <FaArrowAltCircleLeft />
        </span>}
      {task.state!=="DONE"&&
      <span className='right-arrow' onClick={()=>{
        task.state==="PLANING"&&moveTask("ONGOING",id)
        task.state==="ONGOING"&&moveTask("DONE",id)
      }}>
        <FaArrowAltCircleRight />
      </span>}
      </div>
      <div className="task-show-modle">
        <span className='showMore-btn' onClick={()=>setModle(true)}>
          ShowMore
        </span>       
      </div>
  
    </div>
    <div>

    </div>
 {modle&&<div className="task-modle">
    <div className="overly" onClick={()=>toggleModle()}></div>
    <div className="modle-content">
      <div className="modle-header">
        <div className="modle-title" contentEditable={editable} onInput={(e)=>{setNewTitle(e.target.innerHTML)}}>
          {task.title}
        </div>
        <div className="modle-close-btn" >
          <span onClick={()=>toggleModle()}>
            <IoMdCloseCircleOutline />
          </span>
        </div>
      </div>
      <div className="modle-description" contentEditable={editable} onInput={(e)=>{setNewDescription(e.target.innerHTML)}}>
          {task.description}
      </div>
      <hr />
      <div className="modle-footer">
        <div className="modle-date">
          <span>
            {task.date.day +' / '+ task.date.month +' / ' +task.date.year}
          </span>
        </div>
        <div className="modle-edit">
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
  </div>}


 { <div className={classNames('warrning',{showWarrning:warrning})}>
    <div className="warrning-title">Warrning</div>
    <div className="warrning-message">
      Would you like to save the changes ?
    </div>
    <div className="warrning-buttons">
      <button className="save"
      onClick={()=>{
        updateTask(newTitle,newDescription,id)
        toggleEdit()
        setWarrning(false)
      }}>save</button>
      <button className='discurd' 
      onClick={()=>{
        toggleEdit()
        setWarrning(false)
      }}> Discurd</button>
    </div>
  </div>}
    </>

  )
}

export default Task
