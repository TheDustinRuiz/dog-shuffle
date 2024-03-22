import { useState } from 'react'
import DogAPI from './components/DogAPI'
import './App.css'

const API_KEY = import.meta.env.DOG_API_KEY;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DogAPI />
    </>
  )
}

export default App
