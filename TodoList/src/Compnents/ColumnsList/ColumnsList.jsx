import React from 'react'
import Column from '../Column/Column'
import './columnList.css'

const ColumnsList = () => {
  return (
    <div>
    <div className="columns-container">
      <Column  state={'PLANING'}/>
      <Column  state={'ONGOING'}/>
      <Column  state={'DONE'}/>
    </div>
    </div>
  )
}

export default ColumnsList
