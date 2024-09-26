import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Column from './Compnents/Column/Column.jsx'
import ColumnPage from './Compnents/ColumnPage/ColumnPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ColumnsList from './Compnents/ColumnsList/ColumnsList.jsx'

function App() {
  return (
    <>
    {/* <div className="columns-container">
      <Column  state={'PLANING'}/>
      <Column  state={'ONGOING'}/>
      <Column  state={'DONE'}/>
    </div> */}

    
      {/* <ColumnPage state={'PLANING'} /> */}

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ColumnsList />}/>
          <Route path='/PLANING' element={<ColumnPage state={'PLANING'}/>}/>
          <Route path='/ONGOING' element={<ColumnPage state={'ONGOING' }/>} />
          <Route path='/DONE' element={<ColumnPage state={'DONE'}/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
