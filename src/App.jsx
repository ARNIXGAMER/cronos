import { useState } from 'react'
import './App.css'
import { Crono } from './Components/Crono'
import { Button } from 'react-bootstrap'

function App() {
  const [counters, setCounters] = useState([])

  return (
    <div className='container'>
      <div className='title-container'>
        <h1 className='title'>Cronos</h1>
      </div>
      <div className='crono-container'>
        <Crono/>
        <Crono/>
        <Crono/>
      </div>
      <Button variant='primary'>+</Button>
    </div>
  )
}

export default App
