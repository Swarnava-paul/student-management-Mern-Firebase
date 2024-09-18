import { useState } from 'react'
import './App.css'
import {Home,Navbar,FilterSection} from './Components/Component.Exports'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <FilterSection/>
    <Home/>
    </>
  )
}

export default App
