import {create} from 'zustand'
import {persist} from 'zustand/middleware';



const store = (set)=>({
  Tasks:[],
  DragTask: null,
  setDragTask:(id)=>set({DragTask:id}),
  addTask:(title ,description,date,id)=>set((store)=>({Tasks:[...store.Tasks,{title:title,description:description,date:date,id,state:"PLANING"}]})),
  deleteTask:(id)=>set((store)=>({Tasks:store.Tasks.filter((task)=>task.id!==id)})),
  moveTask:(state,id)=>set((store)=>({Tasks:store.Tasks.map((task)=>task.id===id?{...task,state}:task)})),
  updateTask:(title,description,id)=>set((store)=>({Tasks:store.Tasks.map((task)=>task.id===id?{...task,title,description}:task)}))
  





})



export const useStore = create(persist(store))